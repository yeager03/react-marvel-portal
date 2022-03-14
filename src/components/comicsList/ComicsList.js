import "./comicsList.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () => {
	const { loading, error, getAllComics } = useMarvelService();

	const [state, setState] = useState({
		comics: [],
		offset: 0,
		newItemLoading: false,
		charsEnded: false,
	});

	const { comics, offset, newItemLoading, charsEnded } = state;

	useEffect(() => {
		onRequestNewChars(offset, true);
		console.log("mounted");
		// eslint-disable-next-line
	}, []);

	function onCharactersLoaded(comicsList) {
		let ended = false;

		if (comicsList.length < 8) {
			ended = true;
		}

		setState((state) => ({
			...state, // old state with new changes
			comics: [...comics, ...comicsList],
			newItemLoading: false,
			charsEnded: ended,
			offset: offset + 8,
		}));
	}

	function onRequestNewChars(offset, initial) {
		initial
			? setState((state) => ({ ...state, newItemLoading: false }))
			: setState((state) => ({ ...state, newItemLoading: true }));

		getAllComics(offset).then(onCharactersLoaded);
	}

	const errorMessage = error && <ErrorMessage />; // return null, if error isnt true
	const spinner = loading && !newItemLoading && <Spinner />; // return null, if spinner isnt true

	return (
		<div className="comics__list">
			{errorMessage}
			{spinner}
			<View comics={comics} />
			<button
				className="button button__main button__long"
				onClick={() => onRequestNewChars(offset)}
				disabled={newItemLoading}
				style={{ display: charsEnded ? "none" : "block" }}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

const View = ({ comics }) => {
	return (
		<ul className="comics__grid">
			{comics.map(({ title, thumbnail, price, id }, index) => {
				return (
					<li className="comics__item" key={index}>
						<Link to={`${id}`}>
							<img src={thumbnail} alt={title} className="comics__item-img" />
							<div className="comics__item-name">{title}</div>
							<div className="comics__item-price">{price}</div>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default ComicsList;
