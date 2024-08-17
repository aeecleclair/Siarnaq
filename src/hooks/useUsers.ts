import { useToken } from "./useToken";
import { CoreUserSimple, getCdrUsers } from "@/api";
import { useTokenStore } from "@/stores/token";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export interface WSStatus {
  status: string;
}
interface UserStreamMessage {
  command: string;
  data: CoreUserSimple | WSStatus;
}

export const useUsers = () => {
  const { isTokenExpired } = useToken();
  const [returnedUsers, setReturnedUsers] = useState<CoreUserSimple[]>([]);
  const { isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await getCdrUsers();
      if (error) {
        throw error;
      }
      if (data) {
        setReturnedUsers(data);
      }
      return data;
    },
    retry: 3,
    enabled: !isTokenExpired(),
    staleTime: Infinity,
  });

  const { token } = useTokenStore();

  const WEBSOCKET_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL?.replace("http", "ws") +
    "/cdr/users/ws";

  useEffect(() => {
    if (isLoading) return;
    const ws = new WebSocket(WEBSOCKET_URL);
    ws.onopen = () => {
      ws.send(JSON.stringify({ token: token }));
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data) as UserStreamMessage;
      if (message.command) {
        switch (message.command) {
          case "NEW_USER":
            const user = message.data as CoreUserSimple;
            if (!(returnedUsers?.find((u) => u.id === user.id) ?? false)) {
              setReturnedUsers([...returnedUsers, user]);
            }
            break;
          case "WSStatus":
            if ((message.data as WSStatus).status === "invalid_token") {
              console.log("Invalid token, clearing messages");
            }
            break;
        }
      }
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
    return () => {
      ws.close();
    };
  }, [WEBSOCKET_URL, isLoading, returnedUsers, token]);

  return {
    users: returnedUsers,
    isLoading,
    refetch,
  };
};
