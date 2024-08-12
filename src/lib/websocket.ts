import { useTokenStore } from "@/stores/token";
import { useEffect, useState } from "react";

export const useWebSocket = () => {
  const { token } = useTokenStore();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const WEBSOCKET_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL?.replace("http", "ws") +
    "/cdr/users/ws";

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);
    ws.onopen = () => {
      console.log("WebSocket connection established");
      ws.send(JSON.stringify({ token: token }));
    };
    ws.onmessage = (event) => {
      console.log("WebSocket message received", event.data);
      setMessages(JSON.parse(event.data));
    };
    setSocket(ws);
  }, []);

  return { messages, socket };
};
