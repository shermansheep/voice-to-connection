import React from 'react';
import { 
  TrendingUpIcon, 
  TrendingDownIcon,
  MinusIcon 
} from '@heroicons/react/24/outline';

interface StatsProps {
  title: string;
  value: number;
  previousValue?: number;
  format?: 'number' | 'percentage' | 'time';
  suffix?: string;
}

export const AdminStats: React.FC<StatsProps> = ({ 
  title, 
  value, 
  previousValue, 
  format = 'number',
  suffix = ''
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'time':
        return `${val} 分鐘`;
      default:
        return val.toString();
    }
  };

  const getTrend = () => {
    if (!previousValue) return null;
    
    const change = ((value - previousValue) / previousValue) * 100;
    const isPositive = change > 0;
    const isNeutral = Math.abs(change) < 1;

    if (isNeutral) {
      return (
        <div className="flex items-center text-gray-500">
          <MinusIcon className="w-4 h-4 mr-1" />
          <span className="text-sm">持平</span>
        </div>
      );
    }

    return (
      <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <TrendingUpIcon className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDownIcon className="w-4 h-4 mr-1" />
        )}
        <span className="text-sm">{Math.abs(change).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatValue(value)}{suffix}
          </p>
        </div>
        {getTrend()}
      </div>
    </div>
  );
};