import Button from "@material-ui/core/Button";
import Image from "next/image";
import styled from "styled-components";
import Meta from "../components/Meta";
import InputIcon from "@material-ui/icons/Input";
import { auth, authProvider } from "../firebase";

const Login = () => {
	const signIn = async () => {
		try {
			await auth.signInWithPopup(authProvider);
		} catch (error) {
			alert();
		}
	};
	return (
		<Container>
			<Meta title="Login" />
			<LoginContainer>
				<Logo src="/logo.png" width={200} height={200} layout="fixed" />
				<Button
					variant="outlined"
					color="primary"
					onClick={signIn}
					startIcon={<InputIcon />}>
					Sign In With Google
				</Button>
			</LoginContainer>
		</Container>
	);
};

export default Login;

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: whitesmoke;
`;
const LoginContainer = styled.div`
	padding: 3rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 50px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 5px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled(Image)`
	margin-bottom: 50px;
`;
