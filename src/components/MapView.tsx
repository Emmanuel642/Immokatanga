import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  latitude: number;
  longitude: number;
  location: string;
}

export function MapView({ latitude, longitude, location }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Simulación de mapa interactivo
    // En producción, aquí se integraría Leaflet o Mapbox
    if (!mapRef.current || mapInstanceRef.current) return;

    // Por ahora usamos un mapa estático de OpenStreetMap
    const zoom = 15;
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
    
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = '0';
    iframe.src = mapUrl;
    iframe.loading = 'lazy';
    
    if (mapRef.current) {
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
      mapInstanceRef.current = true;
    }

    return () => {
      mapInstanceRef.current = null;
    };
  }, [latitude, longitude]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm">{location}</p>
          <p className="text-xs text-gray-500">
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </p>
        </div>
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-80 rounded-lg border overflow-hidden bg-gray-100"
      >
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-gray-400">Cargando mapa...</div>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Mapa interactivo proporcionado por OpenStreetMap
      </p>
    </div>
  );
}
