import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [portfolio, setPortfolio] = useState({ cash: 0, holdings: [] });

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio')
      .then(res => res.json())
      .then(data => setPortfolio(data));
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Portfolio</h2>
      <p>Cash: ${portfolio.cash.toFixed(2)}</p>
      <ul>
        {portfolio.holdings.map(h => (
          <li key={h.symbol}>{h.symbol}: {h.quantity} shares @ ${h.avgPrice}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
