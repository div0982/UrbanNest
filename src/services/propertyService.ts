import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import SupabaseStorageService from './supabaseStorageService';

export interface Property {
  id?: string;
  // Basic Details
  pgName: string;
  description: string;
  propertyType: 'independent' | 'apartment' | 'villa' | 'hostel';
  
  // Location
  address: string;
  city: string;
  locality: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  fullAddress?: string;
  
  // Room Details
  singleRooms: number;
  singlePrice: number;
  doubleRooms: number;
  doublePrice: number;
  tripleRooms: number;
  triplePrice: number;
  
  // Amenities
  amenities: string[];
  
  // Preferences
  genderPreference: 'male' | 'female' | 'coliving';
  foodIncluded: boolean;
  foodType?: 'veg' | 'nonveg' | 'both';
  
  // Rules
  gateClosingTime?: string;
  smokingAllowed: boolean;
  drinkingAllowed: boolean;
  guestsAllowed: boolean;
  
  // Owner Details
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerId: string; // Firebase Auth UID
  
  // KYC
  aadhar: string;
  pan: string;
  
  // Status & Metadata
  status: 'pending' | 'approved' | 'rejected';
  verified: boolean;
  rating?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Images
  image?: string;
  images?: string[];
}

export interface PropertyFilters {
  city?: string;
  locality?: string;
  minPrice?: number;
  maxPrice?: number;
  genderPreference?: string;
  foodIncluded?: boolean;
  amenities?: string[];
  verified?: boolean;
  roomType?: string;
}

export class PropertyService {
  private static readonly COLLECTION_NAME = 'properties';

  // Create a new property listing
  static async createProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'verified' | 'rating'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), {
        ...propertyData,
        status: 'pending',
        verified: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      console.log('Property created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  }

  // Get all properties with optional filters
  static async getProperties(filters?: PropertyFilters, limitCount?: number, includePending: boolean = false): Promise<Property[]> {
    try {
      let q = query(collection(db, this.COLLECTION_NAME));
      
      // Apply filters
      if (filters?.city) {
        q = query(q, where('city', '==', filters.city));
      }
      
      if (filters?.locality) {
        q = query(q, where('locality', '==', filters.locality));
      }
      
      if (filters?.genderPreference) {
        q = query(q, where('genderPreference', '==', filters.genderPreference));
      }
      
      if (filters?.foodIncluded !== undefined) {
        q = query(q, where('foodIncluded', '==', filters.foodIncluded));
      }
      
      if (filters?.verified !== undefined) {
        q = query(q, where('verified', '==', filters.verified));
      }
      
      if (filters?.minPrice !== undefined) {
        q = query(q, where('singlePrice', '>=', filters.minPrice));
      }
      
      if (filters?.maxPrice !== undefined) {
        q = query(q, where('singlePrice', '<=', filters.maxPrice));
      }
      
      // Only show approved properties for public access, unless includePending is true
      if (!includePending) {
        q = query(q, where('status', '==', 'approved'));
      }
      
      // Order by creation date (newest first) - only if we have status filter
      if (!includePending) {
        q = query(q, orderBy('createdAt', 'desc'));
      } else {
        // For admin view, order by createdAt without status filter to avoid index issues
        q = query(q, orderBy('createdAt', 'desc'));
      }
      
      if (limitCount) {
        q = query(q, limit(limitCount));
      }
      
      const querySnapshot = await getDocs(q);
      const properties: Property[] = [];
      
      querySnapshot.forEach((doc) => {
        properties.push({
          id: doc.id,
          ...doc.data()
        } as Property);
      });
      
      return properties;
    } catch (error) {
      console.error('Error getting properties:', error);
      throw error;
    }
  }

  // Get a single property by ID
  static async getPropertyById(id: string): Promise<Property | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Property;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting property:', error);
      throw error;
    }
  }

  // Update a property
  static async updateProperty(id: string, updates: Partial<Property>): Promise<void> {
    try {
      console.log('=== UPDATE PROPERTY DEBUG ===');
      console.log('Updating property ID:', id);
      console.log('Updates:', updates);
      
      const docRef = doc(db, this.COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      
      console.log('Property updated successfully in Firebase');
      console.log('=== END UPDATE PROPERTY DEBUG ===');
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  }

  // Delete a property
  static async deleteProperty(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  }

  // Get properties by owner
  static async getPropertiesByOwner(ownerId: string): Promise<Property[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('ownerId', '==', ownerId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const properties: Property[] = [];
      
      querySnapshot.forEach((doc) => {
        properties.push({
          id: doc.id,
          ...doc.data()
        } as Property);
      });
      
      return properties;
    } catch (error) {
      console.error('Error getting properties by owner:', error);
      throw error;
    }
  }

  // Get properties for admin dashboard (all statuses)
  static async getPropertiesForAdmin(): Promise<Property[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const properties: Property[] = [];
      
      querySnapshot.forEach((doc) => {
        properties.push({
          id: doc.id,
          ...doc.data()
        } as Property);
      });
      
      return properties;
    } catch (error) {
      console.error('Error getting properties for admin:', error);
      throw error;
    }
  }

  // Get only approved properties for public search
  static async getApprovedProperties(): Promise<Property[]> {
    try {
      // Get all properties first, then filter client-side to avoid index issues
      const allProperties = await this.getPropertiesForAdmin();
      
      console.log('=== DEBUGGING APPROVED PROPERTIES ===');
      console.log('Total properties found:', allProperties.length);
      console.log('All properties with status:', allProperties.map(p => ({
        id: p.id,
        name: p.pgName,
        status: p.status,
        verified: p.verified
      })));
      
      // Filter to only approved properties
      const approvedProperties = allProperties.filter(property => 
        property.status === 'approved'
      );
      
      console.log('Approved properties found:', approvedProperties.length);
      console.log('Approved properties details:', approvedProperties.map(p => ({
        id: p.id,
        name: p.pgName,
        status: p.status,
        verified: p.verified
      })));
      console.log('=== END DEBUGGING ===');
      
      return approvedProperties;
    } catch (error) {
      console.error('Error getting approved properties:', error);
      throw error;
    }
  }

  // Search properties by text (city, locality, pgName)
  static async searchProperties(searchTerm: string): Promise<Property[]> {
    try {
      // Get all properties first, then filter client-side to avoid index issues
      const allProperties = await this.getPropertiesForAdmin();
      const searchLower = searchTerm.toLowerCase();
      
      // Filter to only approved properties and match search term
      const filteredProperties = allProperties.filter(property => 
        property.status === 'approved' && (
          (property.city?.toLowerCase() || '').includes(searchLower) ||
          (property.locality?.toLowerCase() || '').includes(searchLower) ||
          (property.pgName?.toLowerCase() || '').includes(searchLower) ||
          (property.address?.toLowerCase() || '').includes(searchLower)
        )
      );
      
      return filteredProperties;
    } catch (error) {
      console.error('Error searching properties:', error);
      throw error;
    }
  }

  // Delete a property
  static async getPropertyById(propertyId: string): Promise<Property | null> {
    try {
      const propertyRef = doc(db, this.COLLECTION_NAME, propertyId);
      const propertySnap = await getDoc(propertyRef);
      
      if (propertySnap.exists()) {
        const data = propertySnap.data();
        return {
          id: propertySnap.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as Property;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting property by ID:', error);
      throw error;
    }
  }

  // Upload property image to Supabase Storage
  static async uploadPropertyImage(file: File, propertyId: string): Promise<string> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('📤 Uploading property image to Supabase Storage:', {
          propertyId,
          fileName: file.name,
          fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`
        });
      }

      // Upload to Supabase Storage
      const result = await SupabaseStorageService.uploadPropertyImage(file, propertyId);
      
      if (result.error) {
        throw new Error(result.error);
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Property image uploaded successfully to Supabase:', result.url);
      }
      
      return result.url;
    } catch (error) {
      console.error('Error uploading property image to Supabase:', error);
      throw error;
    }
  }

  // Upload multiple property images to Supabase Storage
  static async uploadPropertyImages(files: File[], propertyId: string): Promise<string[]> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('📤 Uploading multiple property images to Supabase Storage:', {
          propertyId,
          fileCount: files.length,
          totalSize: `${(files.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024).toFixed(2)} MB`
        });
      }

      // Upload all images to Supabase Storage
      const results = await SupabaseStorageService.uploadPropertyImages(files, propertyId);
      
      // Filter out failed uploads
      const successfulUploads = results.filter(result => !result.error);
      const failedUploads = results.filter(result => result.error);

      if (failedUploads.length > 0) {
        console.warn('Some images failed to upload:', failedUploads);
      }

      if (successfulUploads.length === 0) {
        throw new Error('All image uploads failed');
      }

      const imageUrls = successfulUploads.map(result => result.url);

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Property images uploaded successfully to Supabase:', imageUrls);
      }
      
      return imageUrls;
    } catch (error) {
      console.error('Error uploading property images to Supabase:', error);
      throw error;
    }
  }

  // Update property with image
  static async updatePropertyWithImage(propertyId: string, updates: Partial<Property>, imageFile?: File): Promise<void> {
    try {
      let imageUrl = updates.image;
      
      // If a new image is provided, upload it
      if (imageFile) {
        imageUrl = await this.uploadPropertyImage(imageFile, propertyId);
      }
      
      // Update the property with the new image URL
      const updateData = {
        ...updates,
        image: imageUrl,
        updatedAt: serverTimestamp()
      };
      
      await this.updateProperty(propertyId, updateData);
    } catch (error) {
      console.error('Error updating property with image:', error);
      throw error;
    }
  }
}
