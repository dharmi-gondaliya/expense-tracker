import React from 'react';
import { DollarSign } from 'lucide-react';

const Balance = ({ balance, darkMode }) => {
  const balanceColor = balance >= 0 ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-all duration-300`}>
      <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
        Current Balance
      </h2>
      <div className="flex items-center space-x-2">
        <DollarSign className={`w-6 h-6 ${balanceColor}`} />
        <p className={`text-3xl font-bold ${balanceColor}`}>
          ₹{balance.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
};

export default Balance;