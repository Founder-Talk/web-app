import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color = 'blue', trend }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          icon: 'bg-blue-500',
          text: 'text-blue-600'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          icon: 'bg-green-500',
          text: 'text-green-600'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          icon: 'bg-yellow-500',
          text: 'text-yellow-600'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          icon: 'bg-purple-500',
          text: 'text-purple-600'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          icon: 'bg-red-500',
          text: 'text-red-600'
        };
      case 'pink':
        return {
          bg: 'bg-pink-50',
          icon: 'bg-pink-500',
          text: 'text-pink-600'
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'bg-gray-500',
          text: 'text-gray-600'
        };
    }
  };

  const colors = getColorClasses(color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${colors.bg} rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span className="font-medium">
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          )}
        </div>
        <div className={`${colors.icon} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;