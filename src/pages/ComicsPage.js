import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

// components
import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import SingleComic from "../components/singleComic/SingleComic";

//pages
import SinglePage from "./SinglePage";

const ComicsPage = () => {
	return (
		<>
			<Routes>
				<Route path=":id" element={<SinglePage Component={SingleComic} dataType="comic" />} />
				<Route
					path="/"
					element={
						<>
							<Helmet>
								<meta name="description" content="Comics information portal" />
								<title>Comics information portal</title>
							</Helmet>
							<AppBanner />
							<ErrorBoundary>
								<ComicsList />
							</ErrorBoundary>
						</>
					}
				/>
			</Routes>
		</>
	);
};

export default ComicsPage;
