import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Search, SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    location: string;
    priceRange: [number, number];
    bedrooms: string;
    bathrooms: string;
    areaRange: [number, number];
    propertyType: string;
    amenities: string[];
    sources: string[];
  };
  onFilterChange: (filters: any) => void;
  onSearch: () => void;
}

export function FilterPanel({ filters, onFilterChange, onSearch }: FilterPanelProps) {
  const updateFilter = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilter('amenities', newAmenities);
  };

  const toggleSource = (source: string) => {
    const newSources = filters.sources.includes(source)
      ? filters.sources.filter((s) => s !== source)
      : [...filters.sources, source];
    updateFilter('sources', newSources);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b">
        <SlidersHorizontal className="h-5 w-5 text-orange-600" />
        <h2>Filtres de Recherche</h2>
      </div>

      {/* Localisation */}
      <div className="space-y-2">
        <Label htmlFor="location">Localisation</Label>
        <div className="relative">
          <Input
            id="location"
            placeholder="Ville, commune, quartier..."
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Type de Propriété */}
      <div className="space-y-2">
        <Label htmlFor="propertyType">Type de Propriété</Label>
        <Select value={filters.propertyType} onValueChange={(value) => updateFilter('propertyType', value)}>
          <SelectTrigger id="propertyType">
            <SelectValue placeholder="Tous" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="appartement">Appartement</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="maison">Maison</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="duplex">Duplex</SelectItem>
            <SelectItem value="penthouse">Penthouse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gamme de Prix */}
      <div className="space-y-3">
        <Label>Prix Mensuel (FC)</Label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => updateFilter('priceRange', value)}
          min={0}
          max={3500000}
          step={50000}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{filters.priceRange[0].toLocaleString()} FC</span>
          <span>{filters.priceRange[1].toLocaleString()} FC</span>
        </div>
      </div>

      {/* Chambres */}
      <div className="space-y-2">
        <Label htmlFor="bedrooms">Chambres</Label>
        <Select value={filters.bedrooms} onValueChange={(value) => updateFilter('bedrooms', value)}>
          <SelectTrigger id="bedrooms">
            <SelectValue placeholder="Toutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Toutes</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Salles de Bain */}
      <div className="space-y-2">
        <Label htmlFor="bathrooms">Salles de Bain</Label>
        <Select value={filters.bathrooms} onValueChange={(value) => updateFilter('bathrooms', value)}>
          <SelectTrigger id="bathrooms">
            <SelectValue placeholder="Toutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Toutes</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Surface */}
      <div className="space-y-3">
        <Label>Surface (m²)</Label>
        <Slider
          value={filters.areaRange}
          onValueChange={(value) => updateFilter('areaRange', value)}
          min={0}
          max={300}
          step={10}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{filters.areaRange[0]}m²</span>
          <span>{filters.areaRange[1]}m²</span>
        </div>
      </div>

      {/* Source de Données */}
      <div className="space-y-3">
        <Label>Source de Données</Label>
        <div className="space-y-2">
          {['ImmoKatanga.cd', 'LogementKatanga.com', 'MaisonKatanga.cd'].map((source) => (
            <div key={source} className="flex items-center space-x-2">
              <Checkbox
                id={source}
                checked={filters.sources.includes(source)}
                onCheckedChange={() => toggleSource(source)}
              />
              <label htmlFor={source} className="text-sm cursor-pointer">
                {source}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Commodités */}
      <div className="space-y-3">
        <Label>Commodités</Label>
        <div className="space-y-2">
          {['Parking', 'Groupe électrogène', 'Piscine', 'Sécurité 24/7', 'Jardin', 'Eau courante'].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <label htmlFor={amenity} className="text-sm cursor-pointer">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Boutons */}
      <div className="space-y-2 pt-4 border-t">
        <Button onClick={onSearch} className="w-full bg-orange-600 hover:bg-orange-700">
          Rechercher
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            onFilterChange({
              location: '',
              priceRange: [0, 3500000],
              bedrooms: 'any',
              bathrooms: 'any',
              areaRange: [0, 300],
              propertyType: 'all',
              amenities: [],
              sources: [],
            })
          }
        >
          Réinitialiser les Filtres
        </Button>
      </div>
    </div>
  );
}
