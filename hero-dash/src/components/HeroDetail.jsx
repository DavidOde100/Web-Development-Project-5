import React from 'react';
import './HeroDetail.css'; // You can create a HeroDetail.css file for styling
//import defaultImage from '../assets/default.jpeg';

const HeroDetail = ({ hero }) => {
  const { name, power, gender, age, species, image } = hero;

  return (
    <div className='hero-detail-container'>
      <h2>{name}</h2>
      <img
        src={image || defaultImage}
        alt={name}
      />
      <div className='hero-detail-info'>
        <p>Power: {power}</p>
        <p>Gender: {gender}</p>
        <p>Age: {age}</p>
        <p>Species: {species}</p>
      </div>
    </div>
  );
};

export default HeroDetail;
