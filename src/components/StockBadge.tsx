import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface StockBadgeProps {
  quantity: number;
  minQuantity: number;
  showIcon?: boolean;
}

export const StockBadge: React.FC<StockBadgeProps> = ({ 
  quantity, 
  minQuantity, 
  showIcon = true 
}) => {
  const getStockStatus = () => {
    if (quantity === 0) {
      return {
        status: 'rupture',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
        text: 'Rupture',
      };
    } else if (quantity <= minQuantity) {
      return {
        status: 'faible',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: AlertTriangle,
        text: 'Stock faible',
      };
    } else {
      return {
        status: 'normal',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        text: 'En stock',
      };
    }
  };

  const stockInfo = getStockStatus();
  const Icon = stockInfo.icon;

  return (
    <div className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
      ${stockInfo.color}
    `}>
      {showIcon && <Icon size={12} />}
      {stockInfo.text}
      <span className="ml-1 font-semibold">({quantity})</span>
    </div>
  );
};