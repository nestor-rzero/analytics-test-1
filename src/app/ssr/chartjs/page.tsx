import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import clientPromise from '@/lib/mongodb';

ChartJS.register(ArcElement, Tooltip, Legend);

export default async function SSRChartJS() {
  const client = await clientPromise;
  const db = client.db('test-db1');
  const votesCollection = await db.collection('votes');
  const votes = await votesCollection.find({}).toArray();

  const labels = Array.from(new Set(votes.map(({ selection }) => selection)));
  const freq =  Array.from(votes.reduce((m, e) => m.set(e.selection, (m.get(e.selection) || 0) + 1), new Map()).values());
  const data = {
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
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="font-bold text-xl mb-4">React ChartJS</h1>
      <div className="max-w-screen-md">
        <Doughnut data={data} />
      </div>
    </main>
  );
}
