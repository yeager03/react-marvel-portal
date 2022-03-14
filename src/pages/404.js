import notFound from "../resources/img/404.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
	const style = {
		display: "block",
		width: "160px",
		margin: "0 auto",
		backgroundColor: "#9F0013",
		padding: "15px 20px",
		fontSize: 14,
		marginTop: 20,
		textAlign: "center",
		color: "#fff",
		textTransform: "uppercase",
	};

	return (
		<>
			<Helmet>
				<meta name="description" content="404 not found" />
				<title>404 not found</title>
			</Helmet>
			<img src={notFound} alt="404 not found" style={{ width: "60%", display: "block", margin: "0 auto" }} />
			<Link to={"/"} style={style}>
				Back to main page
			</Link>
		</>
	);
};

export default NotFound;
