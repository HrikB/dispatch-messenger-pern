import { initializeApp, FirebaseOptions } from "firebase/app";
import { getStorage } from "firebase/storage";

const config: FirebaseOptions = {
  apiKey: "AIzaSyBpsB35eIOcbpYJsgPYswRrL6Zi4ae169I",
  authDomain: "messaging-6bab8.firebaseapp.com",
  databaseURL: "https://messaging-6bab8-default-rtdb.firebaseio.com",
  projectId: "messaging-6bab8",
  storageBucket: "messaging-6bab8.appspot.com",
  messagingSenderId: "780058416898",
  appId: "1:780058416898:web:08d72dd3453945f272541b",
  measurementId: "G-FS624Y3KLJ",
};

const app = initializeApp(config);

const storage = getStorage(app);

export default storage;
