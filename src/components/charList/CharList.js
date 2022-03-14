import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
// styles
import "./charList.scss";

const CharList = ({ onCharSelected, selectedCharID }) => {
	const { loading, error, getAllCharacters } = useMarvelService();

	const [state, setState] = useState({
		chars: [],
		offset: 210,
		newItemLoading: false,
		charsEnded: false,
	});

	const { chars, offset, newItemLoading, charsEnded } = state;

	useEffect(() => {
		onRequestNewChars(offset, true);
		console.log("mounted");
		// eslint-disable-next-line
	}, []);

	/* useEffect(() => {
		console.log("charlist updated");
		// eslint-disable-next-line
	}, [chars]); */

	function onCharactersLoaded(charList) {
		let ended = false;

		if (charList.length < 9) {
			ended = true;
		}

		setState((state) => ({
			...state, // old state with new changes
			chars: [...chars, ...charList],
			newItemLoading: false,
			charsEnded: ended,
			offset: offset + 9,
		}));
	}

	function onRequestNewChars(offset, initial) {
		initial
			? setState((state) => ({ ...state, newItemLoading: false }))
			: setState((state) => ({ ...state, newItemLoading: true }));

		getAllCharacters(offset).then(onCharactersLoaded);
	}

	const errorMessage = error && <ErrorMessage />; // return null, if error isnt true
	const spinner = loading && !newItemLoading && <Spinner />; // return null, if spinner isnt true

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			<View chars={chars} onCharSelected={onCharSelected} selectedCharID={selectedCharID} />
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

const View = ({ chars, onCharSelected, selectedCharID }) => {
	return (
		<ul className="char__grid">
			<TransitionGroup component={null}>
				{chars.map(({ name, thumbnail, id }) => {
					let imgStyle = { objectFit: "cover" };
					thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" &&
						(imgStyle = { objectFit: "unset" });

					let className = "char__item ";

					id === selectedCharID && (className += "char__item_selected");
					return (
						<CSSTransition key={id} classNames={"char__item"} timeout={500}>
							<li className={className} key={id} onFocus={() => onCharSelected(id)} tabIndex={0}>
								<img src={thumbnail} alt="abyss" style={imgStyle} />
								<div className="char__name">{name}</div>
							</li>
						</CSSTransition>
					);
				})}
			</TransitionGroup>
		</ul>
	);
};

CharList.propTypes = {
	onCharSelected: PropTypes.func,
	selectedCharID: PropTypes.number,
};

export default CharList;
