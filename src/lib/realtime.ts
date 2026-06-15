"use client";

import { io, type Socket } from "socket.io-client";
import { dashboardConfig } from "./config";

let socket: Socket | undefined;

export function getDashboardSocket(token?: string) {
  if (!socket) {
    socket = io(dashboardConfig.socketUrl, {
      auth: token ? { token } : undefined,
      autoConnect: false,
      transports: ["websocket"],
    });
  }

  return socket;
}
