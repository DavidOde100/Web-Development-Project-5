import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import './App.css';

function App() {
  const publicKey = 'c72274770486f4fede4001b1e634b3e8';
  const privateKey = 'edd76a42ddf708e71c15519f3ec293cd0029523f';

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [minPower, setMinPower] = useState('');
  const [maxPower, setMaxPower] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const timestamp = new Date().getTime();
        const hash = md5(`${timestamp}${privateKey}${publicKey}`); // Generate the hash

        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
        );
        const jsonData = await response.json();
        setData(jsonData.data.results);
        setFilteredData(jsonData.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Marvel heroes data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [publicKey, privateKey]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    filterData(searchTerm, filterCategory, minPower, maxPower);
  };

  // Handle filter category selection change
  const handleFilterCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFilterCategory(selectedCategory);
    filterData(searchTerm, selectedCategory, minPower, maxPower);
  };

  // Handle min and max power level changes for numerical filters
  const handleMinPowerChange = (e) => {
    const min = e.target.value;
    setMinPower(min);
    filterData(searchTerm, filterCategory, min, maxPower);
  };

  const handleMaxPowerChange = (e) => {
    const max = e.target.value;
    setMaxPower(max);
    filterData(searchTerm, filterCategory, minPower, max);
  };

  // Filter data based on search term, selected category, and filter values
  const filterData = (searchTerm, selectedCategory, min, max) => {
    const filtered = data.filter((hero) => {
      const nameMatches = hero.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatches = selectedCategory ? hero.category === selectedCategory : true;
      const minMatches = min ? hero.powerLevel >= parseFloat(min) : true;
      const maxMatches = max ? hero.powerLevel <= parseFloat(max) : true;
      return nameMatches && categoryMatches && minMatches && maxMatches;
    });
    setFilteredData(filtered);
  };


  return (
    <div className="app-container">
      <h1 className="app-title">Marvel Comics Heroes</h1>
      <div className="filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select className="category-select" value={filterCategory} onChange={handleFilterCategoryChange}>
          <option value="">All</option>
          <option value="Avengers">Avengers</option>
          <option value="X-Men">X-Men</option>
          {/* Add more Marvel hero categories as needed */}
        </select>
        <input
          type="number"
          className="min-power-input"
          placeholder="Min Power Level"
          value={minPower}
          onChange={handleMinPowerChange}
        />
        <input
          type="number"
          className="max-power-input"
          placeholder="Max Power Level"
          value={maxPower}
          onChange={handleMaxPowerChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="heroes-list">
          {filteredData.map((hero) => (
            <li key={hero.id} className="hero-item">
              {hero.name} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;


function calculateAverage(data) {
  const sum = data.reduce((acc, item) => acc + item.value, 0);
  return (sum / data.length).toFixed(2);
}

function calculateMedian(data) {
  const sortedData = data.map((item) => item.value).sort((a, b) => a - b);
  const middle = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    const median = (sortedData[middle - 1] + sortedData[middle]) / 2;
    return median.toFixed(2);
  } else {
    return sortedData[middle].toFixed(2);
  }
}