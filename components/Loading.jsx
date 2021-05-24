import Image from "next/image";
import CircularProgress from "@material-ui/core/CircularProgress";
import Meta from "./Meta";

const Loading = () => {
	return (
		<>
			<Meta title="Loading..." />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
					gap: "10px",
				}}>
				<Image src="/logo.png" alt="Loading" height={200} width={200} />
				<CircularProgress style={{ color: "#3CBC28" }} />
			</div>
		</>
	);
};

export default Loading;
