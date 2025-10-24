import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import ImageService from "@/services/imageService";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload = ({ onImageSelect, currentImage, className = "" }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File | null) => {
    if (!file) {
      setPreview(null);
      onImageSelect(null);
      return;
    }

    try {
      setError(null);
      setIsUploading(true);

      // Validate the image
      const validation = ImageService.validateImageFile(file);
      if (!validation.isValid) {
        setError(validation.error || "Invalid image file");
        return;
      }

      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onImageSelect(file);
    } catch (error) {
      console.error('Error handling file:', error);
      setError("Failed to process image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageSelect(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-sm font-medium">Property Image</div>
      
      <Card className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
        <CardContent className="p-6">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Property preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
                disabled={isUploading}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
              <div className="text-lg font-medium mb-2">Upload Property Image</div>
              <div className="text-sm text-gray-500 mb-4">
                Drag and drop an image here, or click to select
              </div>
              <Button
                onClick={handleClick}
                disabled={isUploading}
                className="gap-2"
              >
                {isUploading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {isUploading ? "Processing..." : "Choose Image"}
              </Button>
              <div className="text-xs text-gray-400 mt-2">
                Supports JPEG, PNG, WebP (max 5MB)
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
