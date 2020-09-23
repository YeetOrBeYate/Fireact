importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-messaging.js');

import { firebaseConfig } from '../src/firebaseInit'


firebase.initializeApp(firebaseConfig);
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
  console.log(event)
  return event;
});
