import RechartsChart from '@/components/recharts/chart';
import clientPromise from '@/lib/mongodb';

export default async function SSRChartJS() {
  const client = await clientPromise;
  const db = client.db('test-db1');
  const votesCollection = await db.collection('votes');
  const votes = await votesCollection.find({}).toArray();

  const data = votes.reduce((m, { selection }) => {
    const index = m.findIndex((item) => item.name === selection);
    if (index === -1) {
      m.push({ name: selection, value: 1 });
    } else {
      m[index].value += 1;
    }
    return m;
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="font-bold text-xl mb-4">React ChartJS</h1>
      <div className="max-w-screen-md">
        <RechartsChart data={data} />
      </div>
    </main>
  );
}
