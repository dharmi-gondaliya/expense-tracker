import React from 'react';
import { Trash2, Calendar, Tag } from 'lucide-react';

const TransactionList = ({ transactions, deleteTransaction, darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-all duration-300`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Recent Transactions
      </h3>
      
      {transactions.length === 0 ? (
        <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No transactions found
        </p>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {transaction.text}
                  </h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Tag className="w-3 h-3 inline mr-1" />
                    {transaction.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(transaction.date).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span
                  className={`font-bold text-lg ${
                    transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    darkMode 
                      ? 'text-red-400 hover:bg-red-900/20' 
                      : 'text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;