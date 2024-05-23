"use client"
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams();
  console.log(searchParams);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Ça va raquer sévère</p>
    </main>
  );
}
