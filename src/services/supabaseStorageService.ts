import { supabase, STORAGE_BUCKETS, STORAGE_CONFIG } from '@/lib/supabase';

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

class SupabaseStorageService {
  /**
   * Upload image to Supabase Storage
   */
  static async uploadImage(
    file: File,
    bucket: string,
    path?: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(file);
      if (!validation.isValid) {
        return { url: '', path: '', error: validation.error };
      }

      // Compress image if needed
      const processedFile = await this.processImage(file);

      // Generate unique filename
      const fileName = this.generateFileName(file.name);
      const filePath = path ? `${path}/${fileName}` : fileName;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, processedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Supabase upload error:', error);
        return { url: '', path: '', error: error.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return {
        url: urlData.publicUrl,
        path: filePath,
      };

    } catch (error) {
      console.error('Upload error:', error);
      return {
        url: '',
        path: '',
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  /**
   * Upload property image
   */
  static async uploadPropertyImage(
    file: File,
    propertyId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    return this.uploadImage(
      file,
      STORAGE_BUCKETS.PROPERTIES,
      propertyId,
      onProgress
    );
  }

  /**
   * Upload multiple property images
   */
  static async uploadPropertyImages(
    files: File[],
    propertyId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map((file, index) => {
      const fileName = `image-${index + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      const customFile = new File([file], fileName, { type: file.type });
      
      return this.uploadImage(
        customFile,
        STORAGE_BUCKETS.PROPERTIES,
        propertyId,
        onProgress
      );
    });

    return Promise.all(uploadPromises);
  }

  /**
   * Upload profile image
   */
  static async uploadProfileImage(
    file: File,
    userId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    return this.uploadImage(
      file,
      STORAGE_BUCKETS.PROFILES,
      userId,
      onProgress
    );
  }

  /**
   * Delete image from storage
   */
  static async deleteImage(bucket: string, path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) {
        console.error('Delete error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  }

  /**
   * Get optimized image URL with transformations
   */
  static getOptimizedImageUrl(
    url: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'webp' | 'jpeg' | 'png';
    } = {}
  ): string {
    const { width, height, quality = 80, format = 'webp' } = options;
    
    // Supabase automatically provides image transformations
    // Add query parameters for optimization
    const params = new URLSearchParams();
    
    if (width) params.append('width', width.toString());
    if (height) params.append('height', height.toString());
    if (quality) params.append('quality', quality.toString());
    if (format) params.append('format', format);
    
    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  /**
   * Validate file before upload
   */
  private static validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file type
    if (!STORAGE_CONFIG.allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Please upload a valid image file (JPEG, PNG, WebP, or GIF)'
      };
    }

    // Check file size
    if (file.size > STORAGE_CONFIG.maxFileSize) {
      return {
        isValid: false,
        error: `File size must be less than ${STORAGE_CONFIG.maxFileSize / 1024 / 1024}MB`
      };
    }

    return { isValid: true };
  }

  /**
   * Process and compress image
   */
  private static async processImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > STORAGE_CONFIG.maxWidth || height > STORAGE_CONFIG.maxHeight) {
          const ratio = Math.min(
            STORAGE_CONFIG.maxWidth / width,
            STORAGE_CONFIG.maxHeight / height
          );
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/webp',
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/webp',
          STORAGE_CONFIG.compressionQuality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Generate unique filename
   */
  private static generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop() || 'webp';
    return `${timestamp}-${random}.${extension}`;
  }
}

export default SupabaseStorageService;
