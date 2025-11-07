import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Database } from 'lucide-react';

interface SourceStatsProps {
  properties: Array<{ source: string }>;
}

export function SourceStats({ properties }: SourceStatsProps) {
  const sourceCount = properties.reduce((acc, prop) => {
    acc[prop.source] = (acc[prop.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sources = [
    { name: 'ImmoKatanga.cd', color: 'bg-orange-500' },
    { name: 'LogementKatanga.com', color: 'bg-green-500' },
    { name: 'MaisonKatanga.cd', color: 'bg-red-500' },
  ];

  const total = properties.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Database className="h-5 w-5 text-orange-600" />
          Statistiques par Source
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sources.map((source) => {
          const count = sourceCount[source.name] || 0;
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
          
          return (
            <div key={source.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">{source.name}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${source.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{percentage}% du total</p>
            </div>
          );
        })}
        
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span>Dernière mise à jour : Il y a 5 minutes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
