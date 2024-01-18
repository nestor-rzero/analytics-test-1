'use client';

import React from 'react';
import { Chart } from 'react-google-charts';

export default function GoogleChartsChart({ data }) {
  const slices = data.slice(1).reduce((m, [name]) => {
    m.push({ color: name });
    return m;
  }, []);

  const options = {
    title: "My Daily Activities",
    pieHole: 0.6,
    is3D: false,
    pieSliceText: "none",
    slices,
    backgroundColor: "transparent",
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      width="100%"
      height="400px"
      options={options}
    />
  );
}
