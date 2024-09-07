import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAu-XnANjjIEIO3Oj5MiCmZMbQAJuNj5dU",
  authDomain: "samadvtu.firebaseapp.com",
  projectId: "samadvtu",
  storageBucket: "samadvtu.appspot.com",
  messagingSenderId: "564221885022",
  appId: "1:564221885022:web:c93402d8715648549c52cf",
  measurementId: "G-GF58RJYNKK"
};

const firebase = initializeApp(firebaseConfig);

export const analytics = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(firebase);
  } else {
    return null
  }
}
export default firebase