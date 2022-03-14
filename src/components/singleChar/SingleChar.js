import "./singleChar.scss";
import { Helmet } from "react-helmet";

const SingleChar = ({ data }) => {
	console.log(data);
	const { name, descr, thumbnail } = data;

	return (
		<>
			<Helmet>
				<meta name="description" content={`Character ${name} information`} />
				<title>{name}</title>
			</Helmet>
			<div className="single-comic">
				<img src={thumbnail} alt={name} className="single-comic__char-img" />
				<div className="single-comic__info">
					<h2 className="single-comic__name">{name}</h2>
					<p className="single-comic__descr">{descr}</p>
				</div>
			</div>
		</>
	);
};

export default SingleChar;
