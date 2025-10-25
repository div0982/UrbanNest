import { supabase } from '@/lib/supabase';

export interface Property {
  id?: string;
  // Basic Details
  pg_name: string;
  description: string;
  property_type: 'independent' | 'apartment' | 'villa' | 'hostel';

  // Location
  address: string;
  city: string;
  locality: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  full_address?: string;

  // Room Details
  single_rooms: number;
  single_price: number;
  double_rooms: number;
  double_price: number;
  triple_rooms: number;
  triple_price: number;

  // Amenities
  amenities: string[];

  // Preferences
  gender_preference: 'male' | 'female' | 'coliving';
  food_included: boolean;
  food_type?: 'veg' | 'nonveg' | 'both';

  // Other Details
  rating?: number;
  verified: boolean;
  gate_closing_time?: string;
  rules?: string[];
  owner_id: string;
  owner_name?: string;
  owner_phone?: string;
  owner_email?: string;

  // Images
  main_image_url: string;
  image_urls: string[];

  // Timestamps
  created_at?: string;
  updated_at?: string;
  status: 'pending' | 'approved' | 'rejected';

  // Additional fields
  pan_number?: string;
  aadhar_number?: string;
  gst_number?: string;
  firebase_id?: string;
}

class SupabasePropertyService {
  // Create a new property
  static async createProperty(propertyData: Omit<Property, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert({
          ...propertyData,
          status: 'pending',
          main_image_url: propertyData.main_image_url || '/placeholder.svg',
          image_urls: propertyData.image_urls || ['/placeholder.svg'],
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data.id;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  }

  // Get all properties
  static async getProperties(): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error getting properties:', error);
      throw error;
    }
  }

  // Get approved properties for search
  static async getApprovedProperties(): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('approved_properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error getting approved properties:', error);
      throw error;
    }
  }

  // Get a single property by ID
  static async getPropertyById(id: string): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Property not found
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error getting property by ID:', error);
      throw error;
    }
  }

  // Update property
  static async updateProperty(id: string, updates: Partial<Property>): Promise<void> {
    try {
      const { error } = await supabase
        .from('properties')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  }

  // Delete property
  static async deleteProperty(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  }

  // Get properties by owner
  static async getPropertiesByOwner(ownerId: string): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', ownerId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error getting properties by owner:', error);
      throw error;
    }
  }

  // Search properties
  static async searchProperties(filters: {
    city?: string;
    locality?: string;
    gender_preference?: string;
    min_price?: number;
    max_price?: number;
    amenities?: string[];
  }): Promise<Property[]> {
    try {
      let query = supabase
        .from('approved_properties')
        .select('*');

      if (filters.city) {
        query = query.eq('city', filters.city);
      }

      if (filters.locality) {
        query = query.eq('locality', filters.locality);
      }

      if (filters.gender_preference) {
        query = query.eq('gender_preference', filters.gender_preference);
      }

      if (filters.min_price) {
        query = query.gte('single_price', filters.min_price);
      }

      if (filters.max_price) {
        query = query.lte('single_price', filters.max_price);
      }

      if (filters.amenities && filters.amenities.length > 0) {
        query = query.overlaps('amenities', filters.amenities);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error searching properties:', error);
      throw error;
    }
  }

  // Get property statistics
  static async getPropertyStats(propertyId: string): Promise<{
    favorite_count: number;
    review_count: number;
    average_rating: number;
  } | null> {
    try {
      const { data, error } = await supabase
        .from('property_stats')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        throw error;
      }

      return {
        favorite_count: data.favorite_count || 0,
        review_count: data.review_count || 0,
        average_rating: data.average_rating || 0
      };
    } catch (error) {
      console.error('Error getting property stats:', error);
      throw error;
    }
  }
}

export default SupabasePropertyService;
