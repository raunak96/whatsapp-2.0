import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDkZuE3qphjn1eUTAXTEdnH56o-N_Wxdk0",
	authDomain: "whatsapp-d6561.firebaseapp.com",
	projectId: "whatsapp-d6561",
	storageBucket: "whatsapp-d6561.appspot.com",
	messagingSenderId: "929089889922",
	appId: "1:929089889922:web:6652f571fd0d3514f1b69b",
};

const app = firebase.apps.length
	? firebase.app()
	: firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = app.auth();

export const authProvider = new firebase.auth.GoogleAuthProvider();
