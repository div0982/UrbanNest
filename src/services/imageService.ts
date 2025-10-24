import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  getMetadata 
} from 'firebase/storage';
import { storage } from '@/lib/firebase';

class ImageService {
  private static storageInstance = storage;

  // Upload image to Firebase Storage
  static async uploadImage(file: File, path: string): Promise<string> {
    try {
      // Create a reference to the file
      const imageRef = ref(this.storageInstance, path);
      
      // Upload the file
      const snapshot = await uploadBytes(imageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      console.log('Image uploaded successfully:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Upload property image
  static async uploadPropertyImage(file: File, propertyId: string): Promise<string> {
    const timestamp = Date.now();
    const fileName = `property-${propertyId}-${timestamp}.${file.name.split('.').pop()}`;
    const path = `properties/${fileName}`;
    
    return this.uploadImage(file, path);
  }

  // Upload user profile image
  static async uploadProfileImage(file: File, userId: string): Promise<string> {
    const timestamp = Date.now();
    const fileName = `profile-${userId}-${timestamp}.${file.name.split('.').pop()}`;
    const path = `profiles/${fileName}`;
    
    return this.uploadImage(file, path);
  }

  // Delete image from Firebase Storage
  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract the path from the URL
      const url = new URL(imageUrl);
      const path = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
      
      // Create a reference to the file
      const imageRef = ref(this.storageInstance, path);
      
      // Delete the file
      await deleteObject(imageRef);
      
      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  // Get image metadata
  static async getImageMetadata(imageUrl: string): Promise<any> {
    try {
      const url = new URL(imageUrl);
      const path = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
      
      const imageRef = ref(this.storageInstance, path);
      const metadata = await getMetadata(imageRef);
      
      return metadata;
    } catch (error) {
      console.error('Error getting image metadata:', error);
      throw error;
    }
  }

  // Validate image file
  static validateImageFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Please upload a valid image file (JPEG, PNG, or WebP)'
      };
    }
    
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'Image size must be less than 5MB'
      };
    }
    
    return { isValid: true };
  }

  // Compress image before upload (client-side)
  static async compressImage(file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }
}

export default ImageService;
