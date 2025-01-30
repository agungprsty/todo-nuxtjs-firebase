import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const db = getFirestore(nuxtApp.$firebaseApp);

  return {
    provide: {
      db,
    },
  };
});