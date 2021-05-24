import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MoreVert from "@material-ui/icons/MoreVert";
import AttachFile from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import Mic from "@material-ui/icons/Mic";
import { useEffect, useRef, useState } from "react";
import firebase from "firebase";
import Message from "./Message";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages, recEmail }) => {
	const [loggedInUser] = useAuthState(auth);
	const router = useRouter();
	const [input, setInput] = useState("");
	const endOfMessageRef = useRef(null);

	const [recipientSnapshot] = useCollection(
		db.collection("users").where("email", "==", recEmail)
	);
	const recipient = recipientSnapshot?.docs?.[0]?.data();

	const [messagesSnapshot] = useCollection(
		db
			.collection("chats")
			.doc(router.query.id)
			.collection("messages")
			.orderBy("timestamp", "asc")
	);

	const displayMessages = () => {
		if (messagesSnapshot) {
			return messagesSnapshot.docs.map(message => (
				<Message
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime(),
					}}
				/>
			));
		}
		return JSON.parse(messages).map(message => (
			<Message key={message.id} user={message.user} message={message} />
		));
	};

	const scrollToMessageEnd = () => {
		endOfMessageRef.current.scrollIntoView({
			behaviour: "smooth",
			block: "start",
		});
	};

	useEffect(() => scrollToMessageEnd(), []);
	const sendMessage = e => {
		e.preventDefault();
		if (!input) return;

		// Update User's last Seen
		db.collection("users").doc(loggedInUser.uid).set(
			{
				lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
			},
			{ merge: true }
		);

		// add Message
		db.collection("chats").doc(router.query.id).collection("messages").add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			user: loggedInUser.email,
			dpURL: loggedInUser.photoURL,
		});
		setInput("");
		scrollToMessageEnd();
	};

	return (
		<Container>
			<Header>
				{recipient ? (
					<Avatar src={recipient.dpURL} />
				) : (
					<Avatar>{recEmail[0]}</Avatar>
				)}
				<HeaderInfo>
					<h3>{recEmail}</h3>
					{recipientSnapshot ? (
						<p>
							Last Active:{" "}
							{recipient?.lastSeen?.toDate() ? (
								<TimeAgo
									datetime={recipient?.lastSeen?.toDate()}
								/>
							) : (
								"Unavailable"
							)}
						</p>
					) : (
						<p>Loading Last Active...</p>
					)}
				</HeaderInfo>
				<HeaderIcons>
					<IconButton>
						<MoreVert />
					</IconButton>
				</HeaderIcons>
			</Header>
			<MessageContainer>
				{displayMessages()}
				<EndOfMessage ref={endOfMessageRef} />
			</MessageContainer>

			<Form onSubmit={sendMessage}>
				<InsertEmoticon />
				<IconButton>
					<AttachFile />
				</IconButton>
				<Input
					value={input}
					onChange={e => setInput(e.target.value)}
					placeholder="Type a message"
				/>
				<Mic />
			</Form>
		</Container>
	);
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
	position: sticky;
	top: 0;
	background-color: #fff;
	z-index: 10;
	display: flex;
	padding: 1rem;
	height: 80px;
	align-items: center;
	border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
	margin-left: 15px;
	flex: 1;

	h3 {
		margin-bottom: 3px;
	}
	p {
		font-size: 0.9rem;
		color: gray;
	}
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
	min-height: 90vh;
	padding: 2rem;
	background-color: #e5ded8;
`;

const EndOfMessage = styled.div`
	margin-bottom: 3rem;
`;

const Form = styled.form`
	display: flex;
	align-items: center;
	padding: 1rem;
	position: sticky;
	bottom: 0;
	background-color: #fff;
	z-index: 100;
`;

const Input = styled.input`
	flex: 1;
	outline: none;
	border: none;
	border-radius: 9999px;
	background-color: whitesmoke;
	padding: 0.8rem;
	margin: auto 15px;
`;
