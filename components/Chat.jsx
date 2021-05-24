import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

const Chat = ({ id, users }) => {
	const [loggedInUser] = useAuthState(auth);
	const router = useRouter();
	const getRecipientEmail = useMemo(
		() => users?.find(user => user !== loggedInUser.email),
		[users]
	);

	const [recipientSnapshot] = useCollection(
		db.collection("users").where("email", "==", getRecipientEmail)
	);
	const recipient = recipientSnapshot?.docs?.[0]?.data();

	return (
		<Container onClick={() => router.push(`/chat/${id}`)}>
			{recipient ? (
				<UserAvatar src={recipient.dpURL} />
			) : (
				<UserAvatar>{getRecipientEmail[0]}</UserAvatar>
			)}
			<p>{getRecipientEmail}</p>
		</Container>
	);
};

export default Chat;

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 15px;
	word-break: break-word;
	cursor: pointer;
	:hover {
		background-color: #e9eaeb;
	}
`;

const UserAvatar = styled(Avatar)`
	margin: 5px;
	margin-right: 15px;
`;
