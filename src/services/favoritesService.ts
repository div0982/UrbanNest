import { 
  collection, 
  addDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Favorite {
  id?: string;
  userId: string;
  propertyId: string;
  propertyName: string;
  propertyImage?: string;
  propertyPrice?: number;
  propertyLocation?: string;
  createdAt: Date;
}

class FavoritesService {
  private static COLLECTION_NAME = 'favorites';

  // Add a property to user's favorites
  static async addToFavorites(userId: string, property: any): Promise<void> {
    try {
      // Check if already favorited
      const existingFavorite = await this.getFavoriteByUserAndProperty(userId, property.id);
      if (existingFavorite) {
        console.log('Property already in favorites');
        return;
      }

      const favoriteData = {
        userId,
        propertyId: property.id,
        propertyName: property.pgName || property.title,
        propertyImage: property.image || '/placeholder.svg',
        propertyPrice: property.singlePrice || property.doublePrice || property.triplePrice || 0,
        propertyLocation: property.location || `${property.city}, ${property.locality}`,
        createdAt: new Date()
      };

      await addDoc(collection(db, this.COLLECTION_NAME), favoriteData);
      console.log('Property added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  }

  // Remove a property from user's favorites
  static async removeFromFavorites(userId: string, propertyId: string): Promise<void> {
    try {
      const favorite = await this.getFavoriteByUserAndProperty(userId, propertyId);
      if (favorite && favorite.id) {
        await deleteDoc(doc(db, this.COLLECTION_NAME, favorite.id));
        console.log('Property removed from favorites');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  // Get all favorites for a user
  static async getUserFavorites(userId: string): Promise<Favorite[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const favorites: Favorite[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        favorites.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date()
        } as Favorite);
      });

      console.log(`Found ${favorites.length} favorites for user ${userId}`);
      return favorites;
    } catch (error) {
      console.error('Error getting user favorites:', error);
      throw error;
    }
  }

  // Check if a property is favorited by user
  static async isPropertyFavorited(userId: string, propertyId: string): Promise<boolean> {
    try {
      const favorite = await this.getFavoriteByUserAndProperty(userId, propertyId);
      return !!favorite;
    } catch (error) {
      console.error('Error checking if property is favorited:', error);
      return false;
    }
  }

  // Get specific favorite by user and property
  private static async getFavoriteByUserAndProperty(userId: string, propertyId: string): Promise<Favorite | null> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        where('propertyId', '==', propertyId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date()
      } as Favorite;
    } catch (error) {
      console.error('Error getting favorite by user and property:', error);
      return null;
    }
  }

  // Toggle favorite status
  static async toggleFavorite(userId: string, property: any): Promise<boolean> {
    try {
      const isFavorited = await this.isPropertyFavorited(userId, property.id);
      
      if (isFavorited) {
        await this.removeFromFavorites(userId, property.id);
        return false;
      } else {
        await this.addToFavorites(userId, property);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }
}

export default FavoritesService;
