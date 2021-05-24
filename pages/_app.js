import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Meta from "../components/Meta";
import Loading from "../components/Loading";
import { useEffect } from "react";
import firebase from "firebase";

function MyApp({ Component, pageProps }) {
	const [user, isLoading] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			db.collection("users").doc(user.uid).set(
				{
					email: user.email,
					lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
					dpURL: user.photoURL,
				},
				{ merge: true }
			);
		}
	}, [user]);
	if (isLoading) return <Loading />;
	return (
		<>
			<Meta />
			{!user ? <Login /> : <Component {...pageProps} />}
		</>
	);
}

export default MyApp;
