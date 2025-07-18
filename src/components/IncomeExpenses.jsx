import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const IncomeExpenses = ({ income, expense, darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-all duration-300`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income */}
        <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Income
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ₹{income.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-800/30 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Expenses */}
        <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Expenses
            </h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              ₹{expense.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="p-3 bg-red-100 dark:bg-red-800/30 rounded-full">
            <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenses;