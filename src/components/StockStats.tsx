import React from 'react';
import { Package, TrendingUp, AlertTriangle, XCircle } from 'lucide-react';
import { StockItem } from '../lib/sanity';

type FilterType = 'all' | 'inStock' | 'lowStock' | 'outOfStock';
interface StockStatsProps {
  items: StockItem[];
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const StockStats: React.FC<StockStatsProps> = ({ items, activeFilter, onFilterChange }) => {
  const stats = {
    total: items.length,
    inStock: items.filter(item => item.quantity > item.minQuantity).length,
    lowStock: items.filter(item => item.quantity > 0 && item.quantity <= item.minQuantity).length,
    outOfStock: items.filter(item => item.quantity === 0).length,
  };

  const statCards = [
    {
      id: 'all' as FilterType,
      title: 'Total articles',
      value: stats.total,
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      activeColor: 'ring-2 ring-blue-500',
    },
    {
      id: 'inStock' as FilterType,
      title: 'En stock',
      value: stats.inStock,
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      activeColor: 'ring-2 ring-green-500',
    },
    {
      id: 'lowStock' as FilterType,
      title: 'Stock faible',
      value: stats.lowStock,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      activeColor: 'ring-2 ring-orange-500',
    },
    {
      id: 'outOfStock' as FilterType,
      title: 'Rupture',
      value: stats.outOfStock,
      icon: XCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100',
      activeColor: 'ring-2 ring-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const isActive = activeFilter === stat.id;
        return (
          <button
            onClick={() => onFilterChange(stat.id)}
            key={index}
            className={`
              p-4 rounded-lg border transition-all duration-200 text-left w-full
              ${stat.bgColor} ${stat.hoverColor} hover:shadow-md
              ${isActive ? stat.activeColor : ''}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
                {isActive && (
<<<<<<< HEAD
                  <p className="mt-1 text-xs text-gray-500">Filtre actif</p>
=======
                  <p className="text-xs text-gray-500 mt-1">Filtre actif</p>
>>>>>>> ede4793d7d73748bbe6dc35b4315c2cdd30cdba3
                )}
              </div>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <Icon className="text-white" size={20} />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};