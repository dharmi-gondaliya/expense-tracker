import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import { PieChart ,Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'; 

const App = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, text: 'Salary', amount: 50000, category: 'Income', date: '2024-01-15' },
    { id: 2, text: 'Groceries', amount: -2000, category: 'Food', date: '2024-01-14' },
    { id: 3, text: 'Petrol', amount: -1500, category: 'Transport', date: '2024-01-13' }
  ]);
  
  const [darkMode, setDarkMode] = useState(false);
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Calculate total income and expenses
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const transactionMonth = transactionDate.getMonth();
    const currentMonth = new Date().getMonth();
    
    const monthMatch = filterMonth === 'all' || 
      (filterMonth === 'current' && transactionMonth === currentMonth);
    
    const categoryMatch = filterCategory === 'all' || 
      transaction.category.toLowerCase() === filterCategory.toLowerCase();
    
    return monthMatch && categoryMatch;
  });

  const amounts = filteredTransactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
  const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;

  // Add transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Generate chart data
  const generateChartData = () => {
    const categoryTotals = {};
    filteredTransactions.forEach(transaction => {
      if (transaction.amount < 0) {
        const category = transaction.category;
        categoryTotals[category] = (categoryTotals[category] || 0) + Math.abs(transaction.amount);
      }
    });

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount,
      color: getRandomColor()
    }));
  };

  const getRandomColor = () => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const chartData = generateChartData();

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Balance balance={total} darkMode={darkMode} />
            <IncomeExpenses income={income} expense={expense} darkMode={darkMode} />
            
            {/* Filters */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Month
                  </label>
                  <select
                    value={filterMonth}
                    onChange={(e) => setFilterMonth(e.target.value)}
                    className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    <option value="all">All Months</option>
                    <option value="current">Current Month</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    <option value="all">All Categories</option>
                    <option value="income">Income</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="shopping">Shopping</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="utilities">Utilities</option>
                  </select>
                </div>
              </div>
            </div>
            
            <TransactionList 
              transactions={filteredTransactions} 
              deleteTransaction={deleteTransaction} 
              darkMode={darkMode} 
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AddTransaction addTransaction={addTransaction} darkMode={darkMode} />
            
            {/* Chart */}
            {chartData.length > 0 && (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Expense Breakdown
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`₹${value}`, 'Amount']}
                        contentStyle={{
                          backgroundColor: darkMode ? '#374151' : '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          color: darkMode ? '#ffffff' : '#000000'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;