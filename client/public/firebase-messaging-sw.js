
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyDOinX_SwCqiZdYOxwhVUNdO0G6jAloy1s",
  authDomain: "notificationkyletest.firebaseapp.com",
  databaseURL: "https://notificationkyletest.firebaseio.com",
  projectId: "notificationkyletest",
  storageBucket: "notificationkyletest.appspot.com",
  messagingSenderId: "1053566752764",
  appId: "1:1053566752764:web:c5359dfb2ec19827d78479"
}

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  event.waitUntil(async function() {
    const allClients = await clients.matchAll({
      includeUncontrolled: true
    });

    let chatClient;

    // Let's see if we already have a chat window open:
    for (const client of allClients) {
      const url = new URL(client.url);

      if (url.pathname == '/chat/') {
        // Excellent, let's use it!
        client.focus();
        chatClient = client;
        break;
      }
    }

    // If we didn't find an existing chat window,
    // open a new one:
    if (!chatClient) {
      chatClient = await clients.openWindow('/chat/');
    }

    // Message the client:
    chatClient.postMessage("New chat messages!");
  }());
});
