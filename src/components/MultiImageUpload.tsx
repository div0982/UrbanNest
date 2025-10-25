import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Image as ImageIcon, Plus } from 'lucide-react';
import SupabaseStorageService from '@/services/supabaseStorageService';
import { STORAGE_BUCKETS } from '@/lib/supabase';

interface MultiImageUploadProps {
  onUploadSuccess: (urls: string[]) => void;
  onUploadError: (error: string) => void;
  bucket?: string;
  folder?: string;
  maxImages?: number;
  className?: string;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  bucket = STORAGE_BUCKETS.PROPERTIES,
  folder,
  maxImages = 5,
  className = ''
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Validate file count
    if (selectedFiles.length + files.length > maxImages) {
      onUploadError(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Validate file types and sizes
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name} is not an image file`);
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        errors.push(`${file.name} is too large (max 5MB)`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      onUploadError(errors.join(', '));
    }

    if (validFiles.length > 0) {
      const newFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(newFiles);

      // Create preview URLs
      const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      onUploadError('Please select at least one image');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const results = await SupabaseStorageService.uploadPropertyImages(
        selectedFiles,
        folder || 'temp',
        (progress) => {
          setUploadProgress(progress.percentage);
        }
      );

      const successfulUploads = results.filter(result => !result.error);
      const failedUploads = results.filter(result => result.error);

      if (failedUploads.length > 0) {
        console.warn('Some images failed to upload:', failedUploads);
      }

      if (successfulUploads.length === 0) {
        throw new Error('All image uploads failed');
      }

      const imageUrls = successfulUploads.map(result => result.url);
      onUploadSuccess(imageUrls);

      // Reset form
      setSelectedFiles([]);
      setPreviewUrls([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      onUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Upload Property Images
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Button */}
        <Button
          onClick={openFileDialog}
          disabled={isUploading || selectedFiles.length >= maxImages}
          className="w-full"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          {selectedFiles.length >= maxImages 
            ? `Maximum ${maxImages} images reached`
            : `Select Images (${selectedFiles.length}/${maxImages})`
          }
        </Button>

        {/* Image Previews */}
        {previewUrls.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Selected Images:</h4>
            <div className="grid grid-cols-2 gap-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <Badge className="absolute bottom-1 left-1 text-xs">
                    {index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Uploading to Supabase...</span>
              <span>{uploadProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Button */}
        {selectedFiles.length > 0 && (
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Images`}
          </Button>
        )}

        {/* Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Maximum {maxImages} images per property</p>
          <p>• Supported formats: JPEG, PNG, WebP, GIF</p>
          <p>• Maximum file size: 5MB per image</p>
          <p>• Images will be automatically optimized</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiImageUpload;
