// App.js
import React, { useEffect, useState } from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((data) => setStocks(data.stocks));
  }, []);

  function handleBuyStock(stock) {
    if (!portfolio.find((s) => s.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  function handleSellStock(stock) {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  }

  function handleSortChange(value) {
    setSortBy(value);
  }

  function handleFilterChange(value) {
    setFilterBy(value);
  }

  // filtering
  let displayedStocks = [...stocks];
  if (filterBy) {
    displayedStocks = displayedStocks.filter(
      (stock) => stock.type === filterBy
    );
  }

  // sorting
  if (sortBy === "Alphabetically") {
    displayedStocks.sort((a, b) => a.ticker.localeCompare(b.ticker));
  } else if (sortBy === "Price") {
    displayedStocks.sort((a, b) => a.price - b.price);
  }

  return (
    <div>
      <Header />
      <MainContainer
        stocks={displayedStocks}
        portfolio={portfolio}
        onBuyStock={handleBuyStock}
        onSellStock={handleSellStock}
        sortBy={sortBy}
        filterBy={filterBy}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

export default App;
