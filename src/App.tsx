import { useState } from 'react';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { SavedSearchesPanel } from './components/SavedSearchesPanel';
import { SourceStats } from './components/SourceStats';
import { QuickStats } from './components/QuickStats';
import { ComparisonTool } from './components/ComparisonTool';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Sheet, SheetContent } from './components/ui/sheet';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from './components/ui/pagination';
import { Toaster } from 'sonner@2.0.3';
import { LayoutGrid, List, Database, GitCompare } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

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
  featured?: boolean;
  source: string;
  description?: string;
  amenities?: string[];
  coordinates?: { lat: number; lng: number };
  updatedAt?: string;
  sourceUrl?: string;
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Appartement Moderne à Lubumbashi Centre',
    location: 'Lubumbashi, Centre-ville',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAyMzg0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Appartement',
    featured: true,
    source: 'ImmoKatanga.cd',
    description: 'Magnifique appartement situé dans le quartier le plus prisé de Lubumbashi. Finitions de haute qualité, salon spacieux, cuisine équipée et balcon avec vue sur la ville.',
    amenities: ['Parking', 'Sécurité 24/7', 'Ascenseur', 'Groupe électrogène', 'Eau courante', 'Gardien'],
    coordinates: { lat: -11.6646, lng: 27.4794 },
    updatedAt: 'Il y a 1 jour',
    sourceUrl: 'https://immokatanga.cd',
  },
  {
    id: 2,
    title: 'Villa de Prestige à Lubumbashi Golf',
    location: 'Lubumbashi, Golf',
    price: 2500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    image: 'https://images.unsplash.com/photo-1610879485443-c472257793d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDI2NTgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Villa',
    featured: true,
    source: 'LogementKatanga.com',
    description: 'Somptueuse villa dans le quartier résidentiel du Golf. Grand jardin arboré, piscine privée, cuisine moderne et garage pour 3 véhicules. Idéale pour famille expatriée.',
    amenities: ['Parking triple', 'Sécurité 24/7', 'Piscine', 'Jardin', 'Groupe électrogène', 'Cuisine équipée', 'Clôture'],
    coordinates: { lat: -11.6592, lng: 27.4858 },
    updatedAt: 'Il y a 3 heures',
    sourceUrl: 'https://logementkatanga.com',
  },
  {
    id: 3,
    title: 'Studio Cosy à Likasi',
    location: 'Likasi, Centre',
    price: 350000,
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image: 'https://images.unsplash.com/photo-1612320743558-020669ff20e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MDMyNjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Studio',
    source: 'MaisonKatanga.cd',
    description: 'Charmant studio entièrement meublé au cœur de Likasi. Parfait pour jeunes professionnels ou étudiants. Proximité marchés et services.',
    amenities: ['Meublé', 'Sécurité', 'Eau courante', 'Électricité'],
    coordinates: { lat: -10.9819, lng: 26.7334 },
    updatedAt: 'Il y a 2 jours',
    sourceUrl: 'https://maisonkatanga.cd',
  },
  {
    id: 4,
    title: 'Appartement Familial à Kolwezi',
    location: 'Kolwezi, Mwangeji',
    price: 950000,
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc2MDMyNjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Appartement',
    source: 'ImmoKatanga.cd',
    description: 'Spacieux appartement familial dans quartier résidentiel calme de Kolwezi. 3 chambres à coucher, cuisine moderne et 2 parkings.',
    amenities: ['Parking double', 'Sécurité 24/7', 'Groupe électrogène', 'Eau courante', 'Gardien'],
    coordinates: { lat: -10.7169, lng: 25.4617 },
    updatedAt: 'Il y a 5 jours',
    sourceUrl: 'https://immokatanga.cd',
  },
  {
    id: 5,
    title: 'Maison Confortable à Kamina',
    location: 'Kamina, Secteur 3',
    price: 650000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: 'https://images.unsplash.com/photo-1627811732414-45c003f9eeec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMjYyODI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Maison',
    featured: true,
    source: 'LogementKatanga.com',
    description: 'Belle maison avec jardin à Kamina. Construction solide, véranda spacieuse et quartier sécurisé. Proche écoles et commerces.',
    amenities: ['Parking', 'Sécurité', 'Jardin', 'Véranda', 'Puits', 'Clôture'],
    coordinates: { lat: -8.7361, lng: 24.9989 },
    updatedAt: 'Il y a 1 jour',
    sourceUrl: 'https://logementkatanga.com',
  },
  {
    id: 6,
    title: 'Duplex Moderne à Lubumbashi Kenya',
    location: 'Lubumbashi, Kenya',
    price: 1200000,
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    image: 'https://images.unsplash.com/photo-1630699376682-84df40131d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiYWxjb255JTIwdmlld3xlbnwxfHx8fDE3NjAzMjY4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Duplex',
    source: 'MaisonKatanga.cd',
    description: 'Duplex de standing dans le quartier Kenya. Design contemporain avec terrasse panoramique. Excellente localisation proche ambassades.',
    amenities: ['Parking double', 'Sécurité 24/7', 'Terrasse', 'Groupe électrogène', 'Ascenseur'],
    coordinates: { lat: -11.6752, lng: 27.5068 },
    updatedAt: 'Il y a 4 jours',
    sourceUrl: 'https://maisonkatanga.cd',
  },
  {
    id: 7,
    title: 'Villa Spacieuse à Lubumbashi Kamalondo',
    location: 'Lubumbashi, Kamalondo',
    price: 1800000,
    bedrooms: 5,
    bathrooms: 4,
    area: 300,
    image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAyMzg0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Villa',
    featured: true,
    source: 'ImmoKatanga.cd',
    description: 'Magnifique villa familiale à Kamalondo. 5 chambres, vaste jardin arboré, pavillon invités indépendant. Quartier diplomatique très prisé.',
    amenities: ['Parking triple', 'Sécurité 24/7', 'Piscine', 'Jardin arboré', 'Groupe électrogène', 'Pavillon invités', 'Cuisine moderne'],
    coordinates: { lat: -11.6458, lng: 27.4636 },
    updatedAt: 'Il y a 2 jours',
    sourceUrl: 'https://immokatanga.cd',
  },
  {
    id: 8,
    title: 'Appartement à Lubumbashi Ruashi',
    location: 'Lubumbashi, Ruashi',
    price: 550000,
    bedrooms: 2,
    bathrooms: 1,
    area: 70,
    image: 'https://images.unsplash.com/photo-1610879485443-c472257793d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDI2NTgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Appartement',
    source: 'LogementKatanga.com',
    description: 'Appartement économique à Ruashi. Idéal pour jeune couple ou petit ménage. Bon état général, quartier dynamique.',
    amenities: ['Parking', 'Sécurité', 'Eau courante', 'Gardien'],
    coordinates: { lat: -11.5974, lng: 27.5829 },
    updatedAt: 'Il y a 6 jours',
    sourceUrl: 'https://logementkatanga.com',
  },
  {
    id: 9,
    title: 'Maison à Likasi Panda',
    location: 'Likasi, Panda',
    price: 700000,
    bedrooms: 3,
    bathrooms: 2,
    area: 130,
    image: 'https://images.unsplash.com/photo-1612320743558-020669ff20e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MDMyNjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Maison',
    source: 'MaisonKatanga.cd',
    description: 'Belle maison dans le quartier Panda à Likasi. Construction en dur, jardin clôturé, proximité écoles et centre commercial.',
    amenities: ['Parking', 'Sécurité', 'Jardin', 'Clôture', 'Puits'],
    coordinates: { lat: -10.9761, lng: 26.7421 },
    updatedAt: 'Il y a 3 jours',
    sourceUrl: 'https://maisonkatanga.cd',
  },
  {
    id: 10,
    title: 'Appartement Standing à Lubumbashi Gambela',
    location: 'Lubumbashi, Gambela',
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    area: 90,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc2MDMyNjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Appartement',
    source: 'ImmoKatanga.cd',
    description: 'Bel appartement de standing dans résidence sécurisée à Gambela. Finitions modernes, balcon spacieux et cuisine équipée.',
    amenities: ['Parking', 'Sécurité 24/7', 'Groupe électrogène', 'Balcon', 'Eau courante'],
    coordinates: { lat: -11.6523, lng: 27.4912 },
    updatedAt: 'Il y a 1 jour',
    sourceUrl: 'https://immokatanga.cd',
  },
  {
    id: 11,
    title: 'Villa de Luxe à Lubumbashi Annexe',
    location: 'Lubumbashi, Annexe',
    price: 3200000,
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    image: 'https://images.unsplash.com/photo-1627811732414-45c003f9eeec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMjYyODI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Villa',
    featured: true,
    source: 'LogementKatanga.com',
    description: 'Villa ultra-moderne dans le quartier Annexe, zone privilégiée de Lubumbashi. Piscine chauffée, home cinéma, domotique complète.',
    amenities: ['Parking triple', 'Sécurité 24/7', 'Piscine chauffée', 'Groupe électrogène', 'Jardin paysager', 'Home cinéma'],
    coordinates: { lat: -11.6389, lng: 27.4721 },
    updatedAt: 'Il y a 2 jours',
    sourceUrl: 'https://logementkatanga.com',
  },
  {
    id: 12,
    title: 'Studio Moderne à Kolwezi Centre',
    location: 'Kolwezi, Centre-ville',
    price: 400000,
    bedrooms: 1,
    bathrooms: 1,
    area: 50,
    image: 'https://images.unsplash.com/photo-1630699376682-84df40131d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiYWxjb255JTIwdmlld3xlbnwxfHx8fDE3NjAzMjY4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Studio',
    source: 'MaisonKatanga.cd',
    description: 'Studio neuf et fonctionnel au centre de Kolwezi. Immeuble moderne avec toutes commodités. Idéal pour célibataires.',
    amenities: ['Parking', 'Sécurité', 'Ascenseur', 'Meublé'],
    coordinates: { lat: -10.7147, lng: 25.4728 },
    updatedAt: 'Il y a 4 jours',
    sourceUrl: 'https://maisonkatanga.cd',
  },
  {
    id: 13,
    title: 'Grande Maison à Lubumbashi Katuba',
    location: 'Lubumbashi, Katuba',
    price: 1500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAyMzg0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Maison',
    source: 'ImmoKatanga.cd',
    description: 'Vaste maison familiale à Katuba. Quartier résidentiel calme, proche université. Grand jardin avec espace barbecue.',
    amenities: ['Parking double', 'Sécurité', 'Jardin', 'Groupe électrogène', 'Espace barbecue'],
    coordinates: { lat: -11.6108, lng: 27.4534 },
    updatedAt: 'Il y a 5 jours',
    sourceUrl: 'https://immokatanga.cd',
  },
  {
    id: 14,
    title: 'Penthouse Prestigieux à Lubumbashi Golf',
    location: 'Lubumbashi, Golf',
    price: 2800000,
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    image: 'https://images.unsplash.com/photo-1610879485443-c472257793d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDI2NTgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Penthouse',
    featured: true,
    source: 'LogementKatanga.com',
    description: 'Penthouse exceptionnel au dernier étage avec vue panoramique sur Lubumbashi. Terrasse de 100m², jacuzzi et finitions haut de gamme.',
    amenities: ['Parking double', 'Sécurité 24/7', 'Ascenseur privatif', 'Terrasse panoramique', 'Jacuzzi', 'Groupe électrogène'],
    coordinates: { lat: -11.6578, lng: 27.4892 },
    updatedAt: 'Il y a 1 jour',
    sourceUrl: 'https://logementkatanga.com',
  },
  {
    id: 15,
    title: 'Maison Confortable à Kamina Lualaba',
    location: 'Kamina, Lualaba',
    price: 580000,
    bedrooms: 3,
    bathrooms: 2,
    area: 115,
    image: 'https://images.unsplash.com/photo-1612320743558-020669ff20e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MDMyNjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Maison',
    source: 'MaisonKatanga.cd',
    description: 'Maison familiale bien entretenue dans le quartier Lualaba. Jardin arboré, véranda couverte et bon environnement.',
    amenities: ['Parking', 'Sécurité', 'Jardin', 'Véranda', 'Puits', 'Clôture'],
    coordinates: { lat: -8.7289, lng: 25.0134 },
    updatedAt: 'Il y a 2 jours',
    sourceUrl: 'https://maisonkatanga.cd',
  },
];

const ITEMS_PER_PAGE = 9;

export default function App() {
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 3500000] as [number, number],
    bedrooms: 'any',
    bathrooms: 'any',
    areaRange: [0, 300] as [number, number],
    propertyType: 'all',
    amenities: [] as string[],
    sources: [] as string[],
  });

  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const filterProperties = (properties: Property[]) => {
    return properties.filter((property) => {
      const matchesLocation = !filters.location || 
        property.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesPrice = property.price >= filters.priceRange[0] && 
        property.price <= filters.priceRange[1];
      
      const matchesBedrooms = filters.bedrooms === 'any' || 
        property.bedrooms >= parseInt(filters.bedrooms);
      
      const matchesBathrooms = filters.bathrooms === 'any' || 
        property.bathrooms >= parseInt(filters.bathrooms);
      
      const matchesArea = property.area >= filters.areaRange[0] && 
        property.area <= filters.areaRange[1];
      
      const matchesType = filters.propertyType === 'all' || 
        property.type.toLowerCase() === filters.propertyType.toLowerCase();
      
      const matchesSource = filters.sources.length === 0 || 
        filters.sources.includes(property.source);

      return matchesLocation && matchesPrice && matchesBedrooms && 
        matchesBathrooms && matchesArea && matchesType && matchesSource;
    });
  };

  const sortProperties = (properties: Property[]) => {
    const sorted = [...properties];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'area-low':
        return sorted.sort((a, b) => a.area - b.area);
      case 'area-high':
        return sorted.sort((a, b) => b.area - a.area);
      case 'featured':
      default:
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }
  };

  const filteredProperties = sortProperties(filterProperties(mockProperties));
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  const handleSearch = () => {
    setIsFilterOpen(false);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCompare = (id: number) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      } else if (prev.length < 4) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Toaster position="top-right" />
      <Header onMenuClick={() => setIsFilterOpen(true)} totalProperties={mockProperties.length} />
      
      {/* Bannière informative */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Database className="h-4 w-4" />
            <p>
              Nous regroupons les propriétés de multiples sources en temps réel : 
              <span className="mx-1">ImmoKatanga.cd</span>•
              <span className="mx-1">LogementKatanga.com</span>•
              <span className="mx-1">MaisonKatanga.cd</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtres - Desktop */}
          <aside className="hidden lg:block space-y-6">
            <FilterPanel 
              filters={filters} 
              onFilterChange={setFilters} 
              onSearch={handleSearch}
            />
            <SavedSearchesPanel 
              currentFilters={filters}
              onLoadSearch={(loadedFilters) => {
                setFilters(loadedFilters);
                setCurrentPage(1);
              }}
            />
            <SourceStats properties={filteredProperties} />
          </aside>

          {/* Filtres - Mobile */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <FilterPanel 
                filters={filters} 
                onFilterChange={setFilters} 
                onSearch={handleSearch}
              />
            </SheetContent>
          </Sheet>

          {/* Contenu Principal */}
          <main className="lg:col-span-3">
            {/* Statistiques Rapides */}
            <QuickStats properties={filteredProperties} />
            
            {/* Barre d'outils */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-gray-600">
                    <span>{filteredProperties.length}</span> propriétés trouvées
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Page {currentPage} sur {totalPages}
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">À la une</SelectItem>
                      <SelectItem value="price-low">Prix : Croissant</SelectItem>
                      <SelectItem value="price-high">Prix : Décroissant</SelectItem>
                      <SelectItem value="area-low">Surface : Croissante</SelectItem>
                      <SelectItem value="area-high">Surface : Décroissante</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-1 border rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant={isComparing ? 'default' : 'outline'}
                    onClick={() => {
                      setIsComparing(!isComparing);
                      if (!isComparing) setCompareIds([]);
                    }}
                  >
                    <GitCompare className="h-4 w-4 mr-2" />
                    Comparer
                  </Button>
                  {compareIds.length > 0 && (
                    <Button onClick={() => setShowComparison(true)}>
                      Voir Comparaison ({compareIds.length})
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Grille de Propriétés */}
            {currentProperties.length > 0 ? (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {currentProperties.map((property) => (
                    <PropertyCard 
                      key={property.id} 
                      {...property}
                      onClick={() => !isComparing && setSelectedProperty(property)}
                      isComparing={isComparing}
                      isSelected={compareIds.includes(property.id)}
                      onToggleCompare={(e) => {
                        e.stopPropagation();
                        toggleCompare(property.id);
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        
                        {getPageNumbers().map((page, index) => (
                          <PaginationItem key={index}>
                            {page === '...' ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                onClick={() => handlePageChange(page as number)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <p className="text-gray-600 mb-2">Aucune propriété trouvée</p>
                <p className="text-sm text-gray-500">
                  Essayez d'ajuster vos critères de recherche
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal de Détails */}
      <PropertyDetailModal
        property={selectedProperty}
        open={!!selectedProperty}
        onOpenChange={(open) => !open && setSelectedProperty(null)}
      />

      {/* Outil de Comparaison */}
      <ComparisonTool
        open={showComparison}
        onOpenChange={setShowComparison}
        properties={filteredProperties}
        selectedIds={compareIds}
        onToggleProperty={toggleCompare}
      />
    </div>
  );
}
