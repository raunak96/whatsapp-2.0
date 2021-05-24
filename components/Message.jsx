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
	border-top-right-radius: 0;

	::after {
		content: " ";
		position: absolute;
		top: 0;
		left: 100%; /* To the left of the tooltip */
		border-width: 5px;
		border-style: solid;
		border-color: #dcf8c6 transparent transparent #dcf8c6;
	}
`;
const Receiver = styled(MessageElement)`
	background-color: whitesmoke;
	text-align: left;
	border-top-left-radius: 0;

	::after {
		content: " ";
		position: absolute;
		top: 0;
		right: 100%; /* To the left of the tooltip */
		border-width: 5px;
		border-style: solid;
		border-color: whitesmoke whitesmoke transparent transparent;
	}
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
