export const dashboardConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api/v1",
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3000",
  mapProvider: process.env.NEXT_PUBLIC_MAP_PROVIDER ?? "mapbox",
  mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ?? "",
  },
  get mapProviderLabel() {
    return this.mapProvider === "google" ? "Google Maps" : "Mapbox";
  },
};

export const isFirebaseMessagingConfigured = Boolean(
  dashboardConfig.firebase.apiKey &&
    dashboardConfig.firebase.projectId &&
    dashboardConfig.firebase.messagingSenderId &&
    dashboardConfig.firebase.appId &&
    dashboardConfig.firebase.vapidKey,
);
