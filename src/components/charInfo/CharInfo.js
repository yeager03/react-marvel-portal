import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

//styles
import "./charInfo.scss";

const CharInfo = ({ selectedCharID }) => {
	const { loading, error, getCharacter, clearError } = useMarvelService();
	const [char, setChar] = useState(null);

	useEffect(() => {
		updateCharacter();
	}, []);

	useEffect(() => {
		console.log("updated");
		updateCharacter();
	}, [selectedCharID]);

	const onCharacterLoaded = (charObj) => setChar(charObj);

	const updateCharacter = () => {
		if (!selectedCharID) {
			return;
		}
		clearError();
		getCharacter(selectedCharID).then(onCharacterLoaded);
	};

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error && <ErrorMessage />; // return null, if error isnt true
	const spinner = loading && <Spinner />; // return null, if spinner isnt true
	const content = !(loading || error || !char) && <View char={char} />;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, descr, homepage, wiki, thumbnail, comics } = char;
	let imgStyle = { objectFit: "cover" };

	thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" &&
		(imgStyle = { objectFit: "unset" });
	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt="abyss" style={imgStyle} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{descr}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0
					? comics.map((obj, i) => {
							return (
								<li className="char__comics-item" key={i}>
									{obj.name}
								</li>
							);
					  })
					: "We haven`t comics for this character :("}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	selectedCharID: PropTypes.number,
};

export default CharInfo;
