import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBYViNc1S2xFTtgTFZwDgqWsszfFYvaI38',
	authDomain: 'neonatal-f46aa.firebaseapp.com',
	databaseURL: 'https://neonatal-f46aa-default-rtdb.firebaseio.com',
	projectId: 'neonatal-f46aa',
	storageBucket: 'neonatal-f46aa.appspot.com',
	messagingSenderId: '356983677686',
	appId: '1:356983677686:web:6e970b8cf371cf19c102d7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebasedb = getDatabase(app);

export { firebasedb };
