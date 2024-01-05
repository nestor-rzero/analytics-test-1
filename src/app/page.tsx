import { useMemo } from "react";
import clientPromise from '@/lib/mongodb';
import { revalidatePath } from "next/cache";
import Container from "./container";

export default async function Home() {
  const client = await clientPromise;
  const db = client.db("test-db1");
  const votesCollection = await db.collection("votes");
  const votes = await votesCollection.find({}).toArray();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="font-bold text-xl">Realtime chart</h1>
      <div className="max-w-screen-md">
      <Container votes={votes} />
      </div>
    </main>
  );
}
