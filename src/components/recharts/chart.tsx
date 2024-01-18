'use client';

import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export default function RechartsChart({ data }) {
  return (
    <PieChart width={730} height={250}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#82ca9d"
        label={({ name }) => name}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.name} />
        ))}
      </Pie>
    </PieChart>
  );
}
