import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Meta from "../../components/Meta";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";

const ChatPage = ({ chat, messages }) => {
	const [loggedInUser] = useAuthState(auth);

	const getRecipientEmail = useMemo(
		() => chat.users?.find(user => user !== loggedInUser.email),
		[chat.users]
	);
	return (
		<>
			<Meta title={`Chat with ${getRecipientEmail}`} />
			<Container>
				<Sidebar />
				<ChatContainer>
					<ChatScreen
						chat={chat}
						messages={messages}
						recEmail={getRecipientEmail}
					/>
				</ChatContainer>
			</Container>
		</>
	);
};

export default ChatPage;

export const getServerSideProps = async ctxt => {
	const chatRef = db.collection("chats").doc(ctxt.query.id);

	const messagesSnapShot = await chatRef
		.collection("messages")
		.orderBy("timestamp", "asc")
		.get();

	const messages = messagesSnapShot.docs
		.map(message => ({
			id: message.id,
			...message.data(),
		}))
		.map(message => ({
			...message,
			timestamp: message.timestamp.toDate().getTime(),
		}));

	const chatSnapShot = await chatRef.get();
	const chat = {
		id: chatSnapShot.id,
		...chatSnapShot.data(),
	};

	return {
		props: { chat, messages: JSON.stringify(messages) },
	};
};

const Container = styled.div`
	display: flex;
`;

const ChatContainer = styled.div`
	flex: 1;
	overflow: scroll;
	height: 100vh;

	/* Hide scrollbar for Chrome, Safari and Opera */
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;
