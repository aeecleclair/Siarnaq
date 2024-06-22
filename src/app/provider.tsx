"use client";

import { useToken } from "@/hooks/useToken";
import { client, createClient } from "@hey-api/client-fetch";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { getToken } = useToken();

  createClient({
    // set default base url for requests
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "https://hyperion.myecl.fr",
  });

  client.interceptors.request.use(async (request) => {
    const token = await getToken();
    if (!token) {
      return request;
    }
    request.headers.set("Authorization", `Bearer ${token}`);
    return request;
  });

  return children;
}
