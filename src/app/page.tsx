"use client";

import { Button } from "@/components/ui/button";
import { useToken } from "@/hooks/useToken";
import { createClient } from "@hey-api/client-fetch";
import Link from "next/link";

export default function Home() {
  const { getToken } = useToken();

  getToken().then((token) => {
    createClient({
      // set default base url for requests
      baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      // set default headers for requests
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="link">
        <Link href="/admin">Vue Admin</Link>
      </Button>
    </main>
  );
}
