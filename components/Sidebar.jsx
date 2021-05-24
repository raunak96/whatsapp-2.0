import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVert from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import * as emailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useCallback } from "react";
import Chat from "./Chat";
import { useRouter } from "next/router";

const Sidebar = () => {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const userChatRef = db
		.collection("chats")
		.where("users", "array-contains", user.email);
	const [chatsSnapshot] = useCollection(userChatRef);

	const createChat = () => {
		const input = prompt("Enter email id if user you want to chat with?");

		if (
			emailValidator.validate(input) &&
			input !== user.email &&
			!chatAlreadyExists(input)
		) {
			db.collection("chats").add({
				users: [user.email, input],
			});
		}
	};

	const chatAlreadyExists = recipient =>
		!!chatsSnapshot?.docs.find(chat =>
			chat.data().users.find(user => user === recipient)
		);
	const signOut = () => {
		auth.signOut();
		router.push("/");
	};
	return (
		<Container>
			<Header>
				<UserAvatar src={user.photoURL} onClick={signOut} />
				<IconsContainer>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</IconsContainer>
			</Header>
			<SearchContainer>
				<SearchIcon />
				<SearchInput placeholder="Search in Chats" />
			</SearchContainer>
			<SidebarButton onClick={createChat}>Start a new Chat</SidebarButton>

			{chatsSnapshot?.docs.map(chat => (
				<Chat key={chat.id} id={chat.id} users={chat.data().users} />
			))}
		</Container>
	);
};

export default Sidebar;

const Container = styled.div`
	flex: 0.3;
	height: 100vh;
	overflow-y: scroll;
	/* Hide scrollbar for Chrome, Safari and Opera */
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	border-right: 1px solid whitesmoke;
	min-width: 300px;
	max-width: 350px;
`;
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	z-index: 2;
	background-color: #fff;
	padding: 15px;
	height: 80px;
	border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		opacity: 0.8;
	}
`;
const IconsContainer = styled.div``;

const SearchContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
	border-radius: 4px;
`;

const SearchInput = styled.input`
	flex: 1;
	border: none;
	:focus {
		outline: none;
	}
`;

const SidebarButton = styled(Button)`
	width: 100%;

	&& {
		border-bottom: 1px solid whitesmoke;
		border-top: 1px solid whitesmoke;
	}
`;
