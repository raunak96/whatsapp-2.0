import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

const Message = ({ user, message }) => {
	const [loggedInUser] = useAuthState(auth);
	const MessageType = loggedInUser.email === user ? Sender : Receiver;
	return (
		<Container>
			<MessageType>
				{message.message}
				<Timestamp>
					{message.timestamp &&
						moment(message.timestamp).format("LT")}
				</Timestamp>
			</MessageType>
		</Container>
	);
};

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
	width: fit-content;
	padding: 1rem;
	border-radius: 8px;
	margin: 0.5rem;
	min-width: 60px;
	padding-bottom: 1.3rem;
	position: relative;
	text-align: right;
`;

const Sender = styled(MessageElement)`
	background-color: #dcf8c6;
	margin-left: auto;
`;
const Receiver = styled(MessageElement)`
	background-color: whitesmoke;
	text-align: left;
`;

const Timestamp = styled.span`
	color: gray;
	padding: 0.5rem;
	font-size: 0.6rem;
	position: absolute;
	bottom: 0;
	right: 0;
	text-align: right;
`;
