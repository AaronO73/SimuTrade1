import React from 'react';
import Dashboard from './components/Dashboard';
import TradeForm from './components/TradeForm';
import TradeHistory from './components/TradeHistory';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">SimuTrade Demo</h1>
      <Dashboard />
      <TradeForm />
      <TradeHistory />
    </div>
  );
}

export default App;
