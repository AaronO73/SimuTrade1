import React, { useEffect, useState } from 'react';

function TradeHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio')
      .then(res => res.json())
      .then(data => setHistory(data.history));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Trade History</h2>
      <ul>
        {history.map((t, index) => (
          <li key={index}>{t.date}: {t.type.toUpperCase()} {t.quantity} {t.symbol} @ ${t.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default TradeHistory;
