import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { X, Plus, Minus, GitCompare } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  type: string;
  source: string;
  amenities?: string[];
}

interface ComparisonToolProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  properties: Property[];
  selectedIds: number[];
  onToggleProperty: (id: number) => void;
}

export function ComparisonTool({ 
  open, 
  onOpenChange, 
  properties, 
  selectedIds,
  onToggleProperty 
}: ComparisonToolProps) {
  const selectedProperties = properties.filter(p => selectedIds.includes(p.id));

  const features = [
    { key: 'price', label: 'Prix Mensuel', format: (v: number) => `${v.toLocaleString()} FC` },
    { key: 'location', label: 'Localisation', format: (v: string) => v },
    { key: 'type', label: 'Type', format: (v: string) => v },
    { key: 'bedrooms', label: 'Chambres', format: (v: number) => `${v}` },
    { key: 'bathrooms', label: 'Salles de bain', format: (v: number) => `${v}` },
    { key: 'area', label: 'Surface', format: (v: number) => `${v}m²` },
    { key: 'source', label: 'Source', format: (v: string) => v },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-orange-600" />
            Comparer les Propriétés ({selectedProperties.length}/4)
          </DialogTitle>
        </DialogHeader>

        {selectedProperties.length === 0 ? (
          <div className="text-center py-12">
            <GitCompare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 mb-2">Aucune propriété à comparer</p>
            <p className="text-sm text-gray-500">
              Sélectionnez jusqu'à 4 propriétés pour les comparer
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left sticky left-0 bg-white z-10">
                    Caractéristique
                  </th>
                  {selectedProperties.map((property) => (
                    <th key={property.id} className="p-3 text-left min-w-[250px]">
                      <div className="relative">
                        <ImageWithFallback
                          src={property.image}
                          alt={property.title}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => onToggleProperty(property.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <h4 className="text-sm line-clamp-2 mt-2">{property.title}</h4>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr key={feature.key} className={idx % 2 === 0 ? 'bg-orange-50/30' : ''}>
                    <td className="p-3 sticky left-0 bg-inherit z-10">
                      <span className="text-sm text-gray-600">{feature.label}</span>
                    </td>
                    {selectedProperties.map((property) => {
                      const value = property[feature.key as keyof Property];
                      return (
                        <td key={property.id} className="p-3">
                          <span className="text-sm">
                            {feature.format(value as any)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="p-3 sticky left-0 bg-white z-10">
                    <span className="text-sm text-gray-600">Commodités</span>
                  </td>
                  {selectedProperties.map((property) => (
                    <td key={property.id} className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {(property.amenities || []).slice(0, 4).map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {(property.amenities?.length || 0) > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{(property.amenities?.length || 0) - 4}
                          </Badge>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {selectedProperties.length > 0 && selectedProperties.length < 4 && (
          <div className="bg-orange-50 p-4 rounded-lg text-sm text-orange-900">
            Vous pouvez ajouter jusqu'à {4 - selectedProperties.length} propriété(s) supplémentaire(s) pour comparer
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
