importScripts("https://www.gstatic.com/firebasejs/7.21.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.21.0/firebase-messaging.js",);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
// importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
// );

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "1053566752764",
  apiKey: "AIzaSyDOinX_SwCqiZdYOxwhVUNdO0G6jAloy1s",
  projectId: "notificationkyletest",
  appId: "1:1053566752764:web:c5359dfb2ec19827d78479",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/itwonders-web-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
