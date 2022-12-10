import Vue from 'vue'
//import App from './App.vue'
//import router from './routes';
import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import {
  getAuth, setPersistence, browserLocalPersistence,
} from 'firebase/auth';
import { VueQueryPlugin } from 'vue-query';
import App from './App.vue';
import router from './routes';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

Vue.config.productionTip = false

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//export const db = app.firestore();

setPersistence(auth, browserLocalPersistence);

//createApp(App).use(router).use(VueQueryPlugin).mount('#app');
