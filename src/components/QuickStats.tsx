import { Card, CardContent } from './ui/card';
import { Home, TrendingDown, TrendingUp, DollarSign } from 'lucide-react';

interface QuickStatsProps {
  properties: Array<{
    price: number;
    type: string;
    featured?: boolean;
  }>;
}

export function QuickStats({ properties }: QuickStatsProps) {
  const avgPrice = properties.length > 0
    ? Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length)
    : 0;

  const minPrice = properties.length > 0
    ? Math.min(...properties.map(p => p.price))
    : 0;

  const maxPrice = properties.length > 0
    ? Math.max(...properties.map(p => p.price))
    : 0;

  const featuredCount = properties.filter(p => p.featured).length;

  const stats = [
    {
      label: 'Propriétés',
      value: properties.length,
      icon: Home,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      label: 'Prix Moyen',
      value: `${avgPrice.toLocaleString()} FC`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Prix Minimum',
      value: `${minPrice.toLocaleString()} FC`,
      icon: TrendingDown,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Prix Maximum',
      value: `${maxPrice.toLocaleString()} FC`,
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 truncate">{stat.label}</p>
                <p className={`${stat.color} truncate`}>{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
