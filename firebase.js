import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyA-8ky6Xh0zRtfyGNNepNHaRs0PuPsJ004',
	authDomain: 'michal-backend.firebaseapp.com',
	projectId: 'michal-backend',
	storageBucket: 'michal-backend.appspot.com',
	messagingSenderId: '968599058899',
	appId: '1:968599058899:web:81ef5a69b290c67cc39726',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
