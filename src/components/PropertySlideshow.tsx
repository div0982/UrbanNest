import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface PropertySlideshowProps {
  images: string[];
  propertyName: string;
  verified?: boolean;
  rating?: number;
  className?: string;
}

const PropertySlideshow: React.FC<PropertySlideshowProps> = ({
  images,
  propertyName,
  verified = false,
  rating,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && images.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
    if (isRightSwipe && images.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Ensure we have at least one image
  const displayImages = images.length > 0 ? images : ['/placeholder.svg'];

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Display */}
      <div 
        ref={containerRef}
        className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }} // Disable zoom, allow vertical scroll
      >
        <img
          src={displayImages[currentIndex]}
          alt={`${propertyName} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ touchAction: 'pan-y' }} // Disable zoom on image
        />

        {/* Overlay with badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {verified && (
            <Badge variant="secondary" className="gap-1 bg-green-100 text-green-800">
              <Shield size={12} />
              Verified
            </Badge>
          )}
          {rating && (
            <Badge className="bg-background/90 text-foreground">
              ⭐ {rating}
            </Badge>
          )}
        </div>
      </div>

      {/* Dot Indicators */}
      {displayImages.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-500 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertySlideshow;
