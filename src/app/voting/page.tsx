import { useMemo } from "react";
import clientPromise from '@/lib/mongodb';
import { revalidatePath } from "next/cache";
import Container from "./container";

async function vote(color: string) {
  'use server';

  const client = await clientPromise;
  const db = client.db("test-db1");
  const votesCollection = await db.collection("votes");
  await votesCollection.insertOne({ selection: color });
}

export default async function Voting() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="font-bold text-xl">Voting</h1>
      <div className="max-w-screen-md">
        <Container vote={vote} />
      </div>
    </main>
  );
}
