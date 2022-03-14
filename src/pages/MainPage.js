import { useState } from "react";
import { Helmet } from "react-helmet";

// components
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import CharSearchForm from "../components/charSearchForm/CharSearchForm";

import decoration from "../resources/img/vision.png";

const MainPage = () => {
	const [selectedCharID, setSelectedCharID] = useState(null);

	const onCharSelected = (id) => {
		setSelectedCharID(id);
	};

	return (
		<>
			<Helmet>
				<meta name="description" content="Marvel information portal" />
				<title>Marvel information portal</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} selectedCharID={selectedCharID} />
				</ErrorBoundary>
				<div>
					<ErrorBoundary>
						<CharInfo selectedCharID={selectedCharID} />
					</ErrorBoundary>
					<ErrorBoundary>
						<CharSearchForm />
					</ErrorBoundary>
				</div>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	);
};

export default MainPage;
