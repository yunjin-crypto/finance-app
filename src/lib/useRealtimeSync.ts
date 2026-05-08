"use client";

import { useEffect, useRef } from "react";
import { socket } from "./socket";

export function useRealtimeSync(callback: () => void) {
  const savedCallback = useRef(callback);

  // 始终保持最新 callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = () => {
      savedCallback.current();
    };

    socket.on("sync-all", handler);

    return () => {
      socket.off("sync-all", handler);
    };
  }, []);
}