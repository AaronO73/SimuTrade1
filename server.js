const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy user portfolio
let portfolio = {
  cash: 1000,
  holdings: [
    { symbol: "AAPL", quantity: 2, avgPrice: 150 },
    { symbol: "TSLA", quantity: 1, avgPrice: 700 }
  ],
  history: []
};

// GET portfolio
app.get('/api/portfolio', (req, res) => {
  res.json(portfolio);
});

// POST trade (buy/sell)
app.post('/api/trade', (req, res) => {
  const { type, symbol, quantity, price } = req.body;

  if (type === "buy") {
    const cost = quantity * price;
    if (cost > portfolio.cash) {
      return res.status(400).json({ error: "Not enough cash" });
    }
    portfolio.cash -= cost;
    const existing = portfolio.holdings.find(h => h.symbol === symbol);
    if (existing) {
      existing.avgPrice = ((existing.avgPrice * existing.quantity) + cost) / (existing.quantity + quantity);
      existing.quantity += quantity;
    } else {
      portfolio.holdings.push({ symbol, quantity, avgPrice: price });
    }
    portfolio.history.push({ type, symbol, quantity, price, date: new Date() });
    return res.json(portfolio);
  }

  if (type === "sell") {
    const existing = portfolio.holdings.find(h => h.symbol === symbol);
    if (!existing || existing.quantity < quantity) {
      return res.status(400).json({ error: "Not enough shares" });
    }
    existing.quantity -= quantity;
    portfolio.cash += quantity * price;
    portfolio.history.push({ type, symbol, quantity, price, date: new Date() });
    return res.json(portfolio);
  }

  res.status(400).json({ error: "Invalid trade type" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));






