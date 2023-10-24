import React from 'react';
import { Link } from 'react-router-dom';
//import defaultImage from '../assets/default.jpeg';
//import './HeroList.css'; // You can create a HeroList.css file for styling

const HeroList = ({ heroes }) => {
  return (
    <div className='heroes-container'>
      {heroes.map((hero) => (
        <div key={hero.id} className='hero-card'>
          <h3>{hero.name}</h3>
          <Link to={`/hero/${hero.id}`}>
            <img src={hero.image || defaultImage} alt={hero.name} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HeroList;

