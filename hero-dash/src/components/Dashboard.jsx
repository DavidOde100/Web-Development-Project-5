import React from 'react';

function Dashboard({ mostCommonPower, mostCommonGender }) {
  return (
    <div className='dashboard'>
      <div className='common-power'>
        <h2>Common Power:</h2>
        <p>{mostCommonPower}</p>
      </div>
      <div className='common-gender'>
        <h2>Common Gender:</h2>
        <p>{mostCommonGender}</p>
      </div>
    </div>
  );
}

export default Dashboard;

