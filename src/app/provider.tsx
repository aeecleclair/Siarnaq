"use client";

import { useToken } from "@/hooks/useToken";
import { useTokenStore } from "@/stores/token";
import { client, createClient } from "@hey-api/client-fetch";

export default function Providers({ children }: { children: React.ReactNode }) {

  createClient({
    // set default base url for requests
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "https://hyperion.myecl.fr",
  });

  client.interceptors.request.use(async (request) => {
    const token = useTokenStore.getState().token;
    request.headers.set("Authorization", `Bearer ${token}`);
    return request;
  });

  return children;
}
