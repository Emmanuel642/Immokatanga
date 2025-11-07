import { Building2, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  onMenuClick: () => void;
  totalProperties: number;
}

export function Header({ onMenuClick, totalProperties }: HeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-orange-600">ImmoKatanga</h1>
                <p className="text-xs text-gray-600">Trouvez votre chez-vous au Katanga</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm hover:text-orange-600 transition-colors">
                Accueil
              </a>
              <a href="#" className="text-sm hover:text-orange-600 transition-colors">
                À la une
              </a>
              <a href="#" className="text-sm hover:text-orange-600 transition-colors">
                À propos
              </a>
            </nav>
            <Badge variant="secondary" className="hidden sm:flex bg-orange-100 text-orange-700">
              {totalProperties.toLocaleString()} propriétés
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
