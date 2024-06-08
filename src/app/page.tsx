"use client";

import { useTokenStore } from "@/stores/token";
import { useRouter } from "next/navigation";

export default function Home() {

  const { token } = useTokenStore();
  const router = useRouter();
  
  if (token === null) {
    router.replace("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      bonjour
    </main>
  );
}
