import { supabase } from '@/lib/supabase';

class SupabaseFavoritesService {
  // Add property to favorites
  static async addFavorite(userId: string, propertyId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: userId,
          property_id: propertyId
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }

  // Remove property from favorites
  static async removeFavorite(userId: string, propertyId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('property_id', propertyId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  // Check if property is favorited
  static async isPropertyFavorited(userId: string, propertyId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('property_id', propertyId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return false; // Not favorited
        }
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  // Get user's favorite properties
  static async getUserFavorites(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error getting user favorites:', error);
      throw error;
    }
  }

  // Get favorite count for a property
  static async getFavoriteCount(propertyId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('favorites')
        .select('*', { count: 'exact', head: true })
        .eq('property_id', propertyId);

      if (error) {
        throw error;
      }

      return count || 0;
    } catch (error) {
      console.error('Error getting favorite count:', error);
      return 0;
    }
  }
}

export default SupabaseFavoritesService;
