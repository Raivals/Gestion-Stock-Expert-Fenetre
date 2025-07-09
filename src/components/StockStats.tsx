import React from 'react';
import { Package, TrendingUp, AlertTriangle, XCircle } from 'lucide-react';
import { StockItem } from '../lib/sanity';

interface StockStatsProps {
  items: StockItem[];
}

export const StockStats: React.FC<StockStatsProps> = ({ items }) => {
  const stats = {
    total: items.length,
    inStock: items.filter(item => item.quantity > item.minQuantity).length,
    lowStock: items.filter(item => item.quantity > 0 && item.quantity <= item.minQuantity).length,
    outOfStock: items.filter(item => item.quantity === 0).length,
  };

  const statCards = [
    {
      title: 'Total articles',
      value: stats.total,
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'En stock',
      value: stats.inStock,
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Stock faible',
      value: stats.lowStock,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Rupture',
      value: stats.outOfStock,
      icon: XCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`p-4 rounded-lg border ${stat.bgColor} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <Icon className="text-white" size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};