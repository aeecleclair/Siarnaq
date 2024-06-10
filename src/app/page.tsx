"use client";

import { Button } from "@/components/ui/button";
import { useTokenStore } from "@/stores/token";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { token } = useTokenStore();
  const router = useRouter();

  if (token === null) {
    router.replace("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="link">
        <Link href="/admin">Vue Admin</Link>
      </Button>
    </main>
  );
}
