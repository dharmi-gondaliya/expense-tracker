import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const AddTransaction = ({ addTransaction, darkMode }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (text.trim() === '' || amount === '') {
      alert('Please enter both text and amount');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text: text.trim(),
      amount: +amount,
      category: category,
      date: new Date().toISOString().split('T')[0]
    };

    addTransaction(newTransaction);
    setText('');
    setAmount('');
    setCategory('Food');
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-all duration-300`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Add New Transaction
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Description
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter description..."
            className={`w-full p-3 rounded-lg border transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount (negative for expense)"
            className={`w-full p-3 rounded-lg border transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          />
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Use negative values for expenses (e.g., -1000)
          </p>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full p-3 rounded-lg border transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          >
            <option value="Income">Income</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg font-medium transition-all duration-200 ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } transform hover:scale-105 active:scale-95`}
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add Transaction</span>
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;