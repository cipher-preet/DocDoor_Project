"use client";

import { isFirebaseMessagingConfigured } from "./config";

export async function getDashboardMessagingToken() {
  if (!isFirebaseMessagingConfigured) {
    return null;
  }

  return null;
}
