'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({
  votes
}) {
  const data = useMemo(() => {
    const labels = Array.from(new Set(votes.map(({ selection }) => selection)));
    const freq =  Array.from(votes.reduce((m, e) => m.set(e.selection, (m.get(e.selection) || 0) + 1), new Map()).values());

    return {
      labels,
      datasets: [
        {
          label: '# of Votes',
          data: freq,
          backgroundColor: labels,
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    }
  }, [votes]);

  const chart = useMemo(() => (
    <Doughnut data={data} />
  ), [data]);

  return chart;
}
