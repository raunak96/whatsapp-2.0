import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVert from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const Sidebar = () => {
	return (
		<Container>
			<Header>
				<UserAvatar />
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
		</Container>
	);
};

export default Sidebar;

const Container = styled.div``;
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
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
	flex-grow: 1;
	:focus {
		outline: none;
	}
`;
