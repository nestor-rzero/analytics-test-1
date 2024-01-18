import NivoChart from '@/components/nivo/chart';
import clientPromise from '@/lib/mongodb';
import { ResponsivePie } from '@nivo/pie';

export default async function SSRChartJS() {
  const client = await clientPromise;
  const db = client.db('test-db1');
  const votesCollection = await db.collection('votes');
  const votes = await votesCollection.find({}).toArray();

  const data = votes.reduce((m, { selection }) => {
    const index = m.findIndex((item) => item.id === selection);
    if (index === -1) {
      m.push({ id: selection, label: selection, value: 1, color: selection });
    } else {
      m[index].value += 1;
    }
    return m;
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="font-bold text-xl mb-4">React ChartJS</h1>
      <div className="max-w-screen-md w-full h-96">
        <NivoChart data={data} />
      </div>
    </main>
  );
}
