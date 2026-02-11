import React, { useState } from 'react';

function TradeForm() {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('buy');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = Math.floor(Math.random() * 100) + 10; // placeholder price
    const res = await fetch('http://localhost:5000/api/trade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, symbol, quantity: Number(quantity), price })
    });
    const data = await res.json();
    console.log(data);
    alert('Trade executed! Check console for updated portfolio.');
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Execute Trade</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input placeholder="Symbol" value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())} className="border p-1" />
        <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} className="border p-1" />
        <select value={type} onChange={e => setType(e.target.value)} className="border p-1">
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1">Trade</button>
      </form>
    </div>
  );
}

export default TradeForm;
