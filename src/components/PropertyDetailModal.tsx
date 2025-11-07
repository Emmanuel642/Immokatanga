import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  DollarSign, 
  Calendar,
  ExternalLink,
  Check,
  Home,
  Building
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapView } from './MapView';

interface PropertyDetailModalProps {
  property: {
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
    description?: string;
    amenities?: string[];
    coordinates?: { lat: number; lng: number };
    updatedAt?: string;
    sourceUrl?: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PropertyDetailModal({ property, open, onOpenChange }: PropertyDetailModalProps) {
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{property.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Principale */}
          <div className="relative">
            <ImageWithFallback
              src={property.image}
              alt={property.title}
              className="w-full h-80 object-cover rounded-lg"
            />
            {property.featured && (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-600 to-red-600">À la une</Badge>
            )}
            <Badge className="absolute top-3 right-3 bg-black/70 text-white">
              {property.type}
            </Badge>
          </div>

          {/* Informations Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Prix mensuel</p>
                  <p className="text-orange-600">{property.price.toLocaleString()} FC</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-600">Localisation</p>
                  <p className="text-sm">{property.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-600">Mise à jour</p>
                  <p className="text-sm">{property.updatedAt || 'Il y a 2 jours'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <Bed className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <p className="text-xs text-gray-600">Chambres</p>
                <p>{property.bedrooms}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Bath className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-xs text-gray-600">Salles de bain</p>
                <p>{property.bathrooms}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Maximize className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-xs text-gray-600">Surface</p>
                <p>{property.area}m²</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Onglets */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="amenities">Commodités</TabsTrigger>
              <TabsTrigger value="map">Localisation</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <div>
                <h3 className="mb-2">Description</h3>
                <p className="text-sm text-gray-600">
                  {property.description || 
                    `${property.type} de ${property.bedrooms} chambres et ${property.bathrooms} salles de bain, avec ${property.area}m² à ${property.location}. Propriété en excellent état, idéale pour familles ou professionnels recherchant confort et accessibilité.`
                  }
                </p>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-4">
              <div>
                <h3 className="mb-3">Commodités</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(property.amenities || ['Parking', 'Sécurité 24/7', 'Groupe électrogène', 'Eau courante', 'Électricité', 'Gardien']).map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="map" className="space-y-4">
              <div>
                <h3 className="mb-3">Carte de localisation</h3>
                <MapView
                  latitude={property.coordinates?.lat || -11.6646}
                  longitude={property.coordinates?.lng || 27.4794}
                  location={property.location}
                />
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          {/* Pied de page */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-orange-50 p-4 rounded-lg">
            <div>
              <p className="text-xs text-gray-600">Publié sur :</p>
              <p>{property.source}</p>
            </div>
            <Button
              onClick={() => window.open(property.sourceUrl || '#', '_blank', 'noopener,noreferrer')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Voir sur le site original
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
