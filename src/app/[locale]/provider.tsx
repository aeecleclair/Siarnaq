"use client";

import { useToken } from "@/hooks/useToken";
import { useTokenStore } from "@/stores/token";

import { client, createClient } from "@hey-api/client-fetch";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { token } = useTokenStore();
  const { refetch } = useToken();

  createClient({
    // set default base url for requests
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "https://hyperion.myecl.fr",
  });

  client.interceptors.request.use(async (request) => {
    if (!token) {
      refetch();
      return request;
    }
    request.headers.set("Authorization", `Bearer ${token}`);
    return request;
  });

  return children;
}
