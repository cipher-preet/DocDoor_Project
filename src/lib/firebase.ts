"use client";

import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { dashboardConfig, isFirebaseMessagingConfigured } from "./config";

export async function getDashboardMessagingToken() {
  if (!isFirebaseMessagingConfigured || !(await isSupported())) {
    return null;
  }

  const app =
    getApps()[0] ??
    initializeApp({
      apiKey: dashboardConfig.firebase.apiKey,
      authDomain: dashboardConfig.firebase.authDomain,
      projectId: dashboardConfig.firebase.projectId,
      messagingSenderId: dashboardConfig.firebase.messagingSenderId,
      appId: dashboardConfig.firebase.appId,
    });

  return getToken(getMessaging(app), {
    vapidKey: dashboardConfig.firebase.vapidKey,
  });
}
