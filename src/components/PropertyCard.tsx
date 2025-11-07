import { Heart, MapPin, Bed, Bath, Maximize, DollarSign, GitCompare } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Checkbox } from './ui/checkbox';

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  type: string;
  featured?: boolean;
  source: string;
  onClick?: () => void;
  isComparing?: boolean;
  isSelected?: boolean;
  onToggleCompare?: (e: React.MouseEvent) => void;
}

export function PropertyCard({
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
  type,
  featured,
  source,
  onClick,
  isComparing,
  isSelected,
  onToggleCompare,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${isSelected ? 'ring-2 ring-orange-500' : ''}`} onClick={onClick}>
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {isComparing && (
            <div
              className="bg-white/90 hover:bg-white p-2 rounded-full cursor-pointer"
              onClick={onToggleCompare}
            >
              <Checkbox checked={isSelected} />
            </div>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart
              className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
            />
          </Button>
        </div>
        {featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-600 to-red-600">À la une</Badge>
        )}
        <Badge className="absolute bottom-3 left-3 bg-black/70 text-white">
          {type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="line-clamp-1">{title}</h3>
          <p className="text-orange-600 whitespace-nowrap ml-2">
            {price.toLocaleString()} FC
          </p>
        </div>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <p className="text-sm line-clamp-1">{location}</p>
        </div>
        <div className="flex items-center justify-between text-gray-600 border-t pt-3">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span className="text-sm">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span className="text-sm">{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span className="text-sm">{area}m²</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t">
          <p className="text-xs text-gray-500">Source : {source}</p>
        </div>
      </CardContent>
    </Card>
  );
}
