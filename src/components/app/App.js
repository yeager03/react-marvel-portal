// router
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SingleChar from "../singleChar/SingleChar";

// Pages , dynamic import for React Lazy have to be under all static imports
const NotFound = lazy(() => import("../../pages/404"));
const MainPage = lazy(() => import("../../pages/MainPage"));
const ComicsPage = lazy(() => import("../../pages/ComicsPage"));
const SinglePage = lazy(() => import("../../pages/SinglePage"));

const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path={"/"} element={<MainPage />} />
							<Route path="characters/:id" element={<SinglePage Component={SingleChar} dataType="character" />} />
							<Route path={"comics/*"} element={<ComicsPage />} />
							<Route path={"*"} element={<NotFound />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
};

export default App;
