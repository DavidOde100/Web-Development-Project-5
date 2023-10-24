// import React, { useState, useEffect } from 'react';
// import md5 from 'md5';
// import { Link } from 'react-router-dom';
// import Chart from 'chart.js/auto';
// import './App.css';

// function App() {
//   const publicKey = 'c72274770486f4fede4001b1e634b3e8';
//   const privateKey = 'edd76a42ddf708e71c15519f3ec293cd0029523f';

//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('');
//   const [minPower, setMinPower] = useState('');
//   const [maxPower, setMaxPower] = useState('');

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const timestamp = new Date().getTime();
//         const hash = md5(`${timestamp}${privateKey}${publicKey}`); // Generate the hash

//         const response = await fetch(
//           `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
//         );
//         const jsonData = await response.json();
//         setData(jsonData.data.results);
//         setFilteredData(jsonData.data.results);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching Marvel heroes data:', error);
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [publicKey, privateKey]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const searchTerm = e.target.value;
//     setSearchTerm(searchTerm);
//     filterData(searchTerm, filterCategory, minPower, maxPower);
//   };

//   // Handle filter category selection change
//   const handleFilterCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setFilterCategory(selectedCategory);
//     filterData(searchTerm, selectedCategory, minPower, maxPower);
//   };

//   // Handle min and max power level changes for numerical filters
//   const handleMinPowerChange = (e) => {
//     const min = e.target.value;
//     setMinPower(min);
//     filterData(searchTerm, filterCategory, min, maxPower);
//   };

//   const handleMaxPowerChange = (e) => {
//     const max = e.target.value;
//     setMaxPower(max);
//     filterData(searchTerm, filterCategory, minPower, max);
//   };

//   // Filter data based on search term, selected category, and filter values
//   const filterData = (searchTerm, selectedCategory, min, max) => {
//     const filtered = data.filter((hero) => {
//       const nameMatches = hero.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const categoryMatches = selectedCategory ? hero.category === selectedCategory : true;
//       const minMatches = min ? hero.powerLevel >= parseFloat(min) : true;
//       const maxMatches = max ? hero.powerLevel <= parseFloat(max) : true;
//       return nameMatches && categoryMatches && minMatches && maxMatches;
//     });
//     setFilteredData(filtered);
//   };


//   return (
//     <div className="app-container">
//       <h1 className="app-title">Hero Dash</h1>
//       <div className="filter-container">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <select className="category-select" value={filterCategory} onChange={handleFilterCategoryChange}>
//           <option value="">All</option>
//           <option value="Avengers">Avengers</option>
//           <option value="X-Men">X-Men</option>
//           {/* Add more Marvel hero categories as needed */}
//         </select>
//         <input
//           type="number"
//           className="min-power-input"
//           placeholder="Min Power Level"
//           value={minPower}
//           onChange={handleMinPowerChange}
//         />
//         <input
//           type="number"
//           className="max-power-input"
//           placeholder="Max Power Level"
//           value={maxPower}
//           onChange={handleMaxPowerChange}
//         />
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul className="heroes-list">
//           {filteredData.map((hero) => (
//             <li key={hero.id} className="hero-item">
//               {hero.name} 
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// function ChartComponent({ data }) {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (data.length > 0 && chartRef.current) {
//       const ctx = chartRef.current.getContext('2d');

//       const categories = [...new Set(data.map(hero => hero.category))];
//       const averagePowers = categories.map(category => {
//         const categoryHeroes = data.filter(hero => hero.category === category);
//         const totalPower = categoryHeroes.reduce((acc, hero) => acc + parseFloat(hero.powerLevel), 0);
//         const averagePower = totalPower / categoryHeroes.length;
//         return averagePower;
//       });

//       new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: categories,
//           datasets: [
//             {
//               label: 'Average Power Level',
//               data: averagePowers,
//               backgroundColor: 'rgba(225, 38, 38, 0.7)',
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });
//     }
//   }, [data]);

//   return (
//     <div className="chart-container">
//       <canvas ref={chartRef} />
//     </div>
//   );
// }

// export default App;


// function calculateAverage(data) {
//   const sum = data.reduce((acc, item) => acc + item.value, 0);
//   return (sum / data.length).toFixed(2);
// }

// function calculateMedian(data) {
//   const sortedData = data.map((item) => item.value).sort((a, b) => a - b);
//   const middle = Math.floor(sortedData.length / 2);
//   if (sortedData.length % 2 === 0) {
//     const median = (sortedData[middle - 1] + sortedData[middle]) / 2;
//     return median.toFixed(2);
//   } else {
//     return sortedData[middle].toFixed(2);
//   }
// }


import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import axios from 'axios';
import './App.css';
//import './components/heroes.css'; // Create a heroes.css file for styling
import Dashboard from './components/Dashboard.jsx';
import HeroDetail from './components/HeroDetail.jsx'; // Create a HeroDetail component
import HeroList from './components/HeroList.jsx'; // Create a HeroList component
import PowerFrequencyBarChart from './components/PowerFrequencyBarChart.jsx'; // Create a PowerFrequencyBarChart component
import GenderFrequencyBarChart from './components/GenderFrequencyBarChart.jsx';

const publicKey = 'c72274770486f4fede4001b1e634b3e8';
const privateKey = 'edd76a42ddf708e71c15519f3ec293cd0029523f';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [powerFilter, setPowerFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [mostCommonPower, setMostCommonPower] = useState('');
  const [mostCommonGender, setMostCommonGender] = useState('');
  const [mostCommonAge, setMostCommonAge] = useState('');

  const powerFrequencyData = useMemo(() => {
    const powerCount = {};

    heroes.forEach((hero) => {
      powerCount[hero.power] = (powerCount[hero.power] || 0) + 1;
    });

    return Object.keys(powerCount).map((power) => ({
      power,
      frequency: powerCount[power],
    }));
  }, [heroes]);

  const genderFrequencyData = useMemo(() => {
    const genderCount = {};

    heroes.forEach((hero) => {
      genderCount[hero.gender] = (genderCount[hero.gender] || 0) + 1;
    });

    return Object.keys(genderCount).map((gender) => ({
      gender,
      frequency: genderCount[gender],
    }));
  }, [heroes]);

  const HeroDetailWrapper = ({ heroes }) => {
    const { id } = useParams();
    const hero = heroes.find((h) => h.id.toString() === id);
    return hero ? <HeroDetail hero={hero} /> : <h2>Hero not found</h2>;
  };

  const calculateMostCommonAttributes = (heroesData) => {
    if (!heroesData || heroesData.length === 0) {
      return;
    }

    const powerCount = {};
    const genderCount = {};
    const ageCount = {};

    heroesData.forEach((hero) => {
      powerCount[hero.power] = (powerCount[hero.power] || 0) + 1;
      genderCount[hero.gender] = (genderCount[hero.gender] || 0) + 1;
      ageCount[hero.age] = (ageCount[hero.age] || 0) + 1;
    });

    const mostCommonPower = Object.keys(powerCount).reduce(
      (a, b) => (powerCount[a] > powerCount[b] ? a : b),
      ''
    );
    const mostCommonGender = Object.keys(genderCount).reduce(
      (a, b) => (genderCount[a] > genderCount[b] ? a : b),
      ''
    );
    const mostCommonAge = Object.keys(ageCount).reduce(
      (a, b) => (ageCount[a] > ageCount[b] ? a : b),
      ''
    );

    setMostCommonPower(mostCommonPower);
    setMostCommonGender(mostCommonGender);
    setMostCommonAge(mostCommonAge);
  };

  const fetchHeroes = async () => {
    try {
      const response = await axios.get('https://api.marvel.com/v2/heroes', {
        headers: {
          Authorization: `Bearer ${publicKey}:${privateKey}`,
        },
        params: {
          limit: 100,
        },
      });
      setHeroes(response.data.heroes);
      calculateMostCommonAttributes(response.data.heroes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAgeFilterChange = (event) => {
    setAgeFilter(event.target.value);
  };

  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
  };

  useEffect(() => {
    const filtered = heroes
      .filter((hero) => hero.name.toLowerCase().includes(search.toLowerCase()))
      .filter((hero) => (!powerFilter ? true : hero.power === powerFilter))
      .filter((hero) => (!ageFilter ? true : hero.age === ageFilter))
      .filter((hero) => (!genderFilter ? true : hero.gender === genderFilter));

    setFilteredHeroes(filtered);
  }, [search, heroes, powerFilter, ageFilter, genderFilter]);

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePowerFilter = (event) => {
    setPowerFilter(event.target.value);
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <h1>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            Marvel Hero Browser
          </Link>
        </h1>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Dashboard
                  mostCommonPower={mostCommonPower}
                  mostCommonGender={mostCommonGender}
                  mostCommonAge={mostCommonAge}
                />
                <div className='graph-container'>
                  <GenderFrequencyBarChart data={genderFrequencyData} />
                  <PowerFrequencyBarChart data={powerFrequencyData} />
                </div>
                <HeroList heroes={filteredHeroes} />
              </>
            }
          />
          <Route path='/hero/:id' element={<HeroDetailWrapper heroes={heroes} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


