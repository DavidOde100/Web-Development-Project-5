import React from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from 'recharts';
//import './graphs.css'; // You can create a graphs.css file for styling

const PowerFrequencyBarChart = ({ data }) => {
  return (
    <div className='graph'>
      <h2 className='graph-title'>Power Frequency</h2>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='power' />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey='frequency'
          fill='#8884d8'
        />
      </BarChart>
    </div>
  );
};

export default PowerFrequencyBarChart;
