import firebase from 'firebase/app';
import 'firebase/messaging';

export const firebaseConfig = {
  apiKey: "AIzaSyDOinX_SwCqiZdYOxwhVUNdO0G6jAloy1s",
  authDomain: "notificationkyletest.firebaseapp.com",
  databaseURL: "https://notificationkyletest.firebaseio.com",
  projectId: "notificationkyletest",
  storageBucket: "notificationkyletest.appspot.com",
  messagingSenderId: "1053566752764",
  appId: "1:1053566752764:web:c5359dfb2ec19827d78479"
};

firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging();

// next block of code goes here

export const requestFirebaseNotificationPermission = () =>
new Promise((resolve, reject) => {
  messaging
  .getToken()
  .then((firebaseToken) => {
        resolve(firebaseToken);
      })
  .catch((err) => {
      console.log(err)
      reject(err);
    });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      console.log('messages')
      resolve(payload);
    });
  });
