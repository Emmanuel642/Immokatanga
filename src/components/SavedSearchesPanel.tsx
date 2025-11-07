import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Bell, BellOff, Trash2, Plus, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface SavedSearch {
  id: number;
  name: string;
  filters: {
    location: string;
    priceRange: [number, number];
    bedrooms: string;
    bathrooms: string;
    areaRange: [number, number];
    propertyType: string;
    sources: string[];
  };
  alertsEnabled: boolean;
  matchCount: number;
  createdAt: string;
}

interface SavedSearchesPanelProps {
  currentFilters: any;
  onLoadSearch: (filters: any) => void;
}

export function SavedSearchesPanel({ currentFilters, onLoadSearch }: SavedSearchesPanelProps) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: 1,
      name: 'Appartements à Lubumbashi Golf',
      filters: {
        location: 'Golf',
        priceRange: [600000, 1500000],
        bedrooms: '2',
        bathrooms: '2',
        areaRange: [80, 150],
        propertyType: 'appartement',
        sources: ['ImmoKatanga.cd'],
      },
      alertsEnabled: true,
      matchCount: 3,
      createdAt: 'Il y a 2 jours',
    },
    {
      id: 2,
      name: 'Villas à Kolwezi',
      filters: {
        location: 'Kolwezi',
        priceRange: [1000000, 2500000],
        bedrooms: '3',
        bathrooms: '2',
        areaRange: [150, 300],
        propertyType: 'villa',
        sources: [],
      },
      alertsEnabled: false,
      matchCount: 2,
      createdAt: 'Il y a 5 jours',
    },
  ]);

  const [newSearchName, setNewSearchName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleAlert = (id: number) => {
    setSavedSearches(prev =>
      prev.map(search =>
        search.id === id
          ? { ...search, alertsEnabled: !search.alertsEnabled }
          : search
      )
    );
    const search = savedSearches.find(s => s.id === id);
    if (search) {
      toast.success(
        search.alertsEnabled
          ? 'Alertes désactivées'
          : 'Alertes activées - Nous vous informerons des nouvelles propriétés'
      );
    }
  };

  const deleteSearch = (id: number) => {
    setSavedSearches(prev => prev.filter(search => search.id !== id));
    toast.success('Recherche supprimée');
  };

  const saveCurrentSearch = () => {
    if (!newSearchName.trim()) {
      toast.error('Veuillez entrer un nom pour la recherche');
      return;
    }

    const newSearch: SavedSearch = {
      id: Date.now(),
      name: newSearchName,
      filters: currentFilters,
      alertsEnabled: true,
      matchCount: 0,
      createdAt: 'Maintenant',
    };

    setSavedSearches(prev => [newSearch, ...prev]);
    setNewSearchName('');
    setIsDialogOpen(false);
    toast.success('Recherche sauvegardée avec alertes activées');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-600" />
            Recherches Sauvegardées
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Sauvegarder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sauvegarder la recherche actuelle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="search-name">Nom de la recherche</Label>
                  <Input
                    id="search-name"
                    placeholder="Ex: Appartements à Lubumbashi Centre"
                    value={newSearchName}
                    onChange={(e) => setNewSearchName(e.target.value)}
                  />
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Bell className="h-4 w-4 text-orange-600 mt-0.5" />
                    <p className="text-sm text-orange-900">
                      Des alertes automatiques seront activées. Nous vous informerons lorsque de nouvelles propriétés correspondant à vos critères seront disponibles.
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={saveCurrentSearch} className="bg-orange-600 hover:bg-orange-700">
                  <Check className="h-4 w-4 mr-1" />
                  Sauvegarder
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {savedSearches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Aucune recherche sauvegardée</p>
            <p className="text-xs mt-1">Sauvegardez vos filtres favoris pour recevoir des alertes</p>
          </div>
        ) : (
          savedSearches.map((search) => (
            <div
              key={search.id}
              className="border rounded-lg p-3 hover:bg-orange-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-sm line-clamp-1">{search.name}</h4>
                  <p className="text-xs text-gray-500">{search.createdAt}</p>
                </div>
                {search.matchCount > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700">
                    {search.matchCount} nouvelles
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    onLoadSearch(search.filters);
                    toast.success('Filtres appliqués');
                  }}
                >
                  Appliquer
                </Button>
                <Button
                  size="sm"
                  variant={search.alertsEnabled ? 'default' : 'outline'}
                  className={search.alertsEnabled ? 'bg-orange-600 hover:bg-orange-700' : ''}
                  onClick={() => toggleAlert(search.id)}
                >
                  {search.alertsEnabled ? (
                    <Bell className="h-4 w-4" />
                  ) : (
                    <BellOff className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteSearch(search.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
