import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { store } from "./store";
import { apolloClient } from "./apollo";
import { UPDATE_PUSH_TOKEN } from "./queries";

export const config = {
  apiKey: "AIzaSyDQV6SMwJk91fFuZGewlyvJHNcxyYTUxqQ",
  authDomain: "moyats-60dfd.firebaseapp.com",
  databaseURL: "https://moyats-60dfd-default-rtdb.firebaseio.com",
  projectId: "moyats-60dfd",
  storageBucket: "moyats-60dfd.appspot.com",
  messagingSenderId: "960557736635",
  appId: "1:960557736635:web:2b65cedfa4b794e1383f9e",
  measurementId: "G-G7RHL9H6J3",
};

const app = initializeApp(config);
const db = getFirestore(app);
let messaging: any;

export const setupFirebase = async () => {
  if (await isSupported()) {
    messaging = getMessaging(app);
  }
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Registration", registration);
      // Vue.prototype.$messaging.useServiceWorker(registration)
    })
    .catch((err) => {
      console.log(err);
    });

  getToken(messaging, {
    vapidKey:
      "BBWn7Fkrmhrj0BkeKLiYcD5VhagQg4zlrW-QtpC0VpuPGiPVTK6nleZMNrmo4U0qUSgM48esnt_hAv1vOSivkUk",
  })
    .then(async (currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        if (store.state.loggedIn) {
          apolloClient.mutate({
            mutation: UPDATE_PUSH_TOKEN,
            variables: {
              token: currentToken,
            },
          });
        }
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};

export { db, messaging };
