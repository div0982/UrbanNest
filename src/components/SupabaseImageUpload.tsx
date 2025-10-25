import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SupabaseStorageService from '@/services/supabaseStorageService';
import { STORAGE_BUCKETS } from '@/lib/supabase';

interface SupabaseImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
  bucket?: string;
  folder?: string;
  className?: string;
  accept?: string;
  maxSize?: number;
}

const SupabaseImageUpload: React.FC<SupabaseImageUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  bucket = STORAGE_BUCKETS.PROPERTIES,
  folder,
  className = '',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024 // 5MB
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size
      if (file.size > maxSize) {
        onUploadError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      onUploadError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await SupabaseStorageService.uploadImage(
        selectedFile,
        bucket,
        folder,
        (progress) => {
          setUploadProgress(progress.percentage);
        }
      );

      if (result.error) {
        onUploadError(result.error);
      } else {
        onUploadSuccess(result.url);
        // Reset form
        setSelectedFile(null);
        setPreviewUrl('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      onUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle>Upload Image to Supabase Storage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select an image file:
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isUploading}
          />
        </div>

        {/* File Preview */}
        {previewUrl && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              <p><strong>File:</strong> {selectedFile?.name}</p>
              <p><strong>Size:</strong> {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : ''}</p>
              <p><strong>Type:</strong> {selectedFile?.type}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Preview:</p>
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-md border"
              />
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

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="flex-1"
          >
            {isUploading ? 'Uploading...' : 'Upload to Supabase'}
          </Button>
          
          {selectedFile && (
            <Button
              onClick={handleRemoveFile}
              variant="outline"
              disabled={isUploading}
            >
              Remove
            </Button>
          )}
        </div>

        {/* Bucket Info */}
        <div className="text-xs text-gray-500">
          <p>Bucket: <code>{bucket}</code></p>
          {folder && <p>Folder: <code>{folder}</code></p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseImageUpload;
