import React from 'react';
import { DollarSign, Sun, Moon } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300`}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <DollarSign className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Expense Tracker
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;