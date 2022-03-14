import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const { loading, error, request, clearError } = useHttp();

	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=3451ffba666ca90ca74bba48cd860083";
	// #secondKey = "apikey=8b37623dd1a1e68a0ae523c8696de5c4";
	const _baseOffset = 210;
	const _commicsOffset = 0;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map((obj) => _transformCharacter(obj));
	};

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = _commicsOffset) => {
		const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

	const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

	const _transformCharacter = (char) => {
		// transformation objects
		return {
			name: char.name,
			descr: char.description ? `${char.description.slice(0, 180)}...` : "We haven`t description for this character :(",
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items.slice(0, 10),
		};
	};

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects.language || "en-us",
			price: comics.prices.price ? `${comics.prices.price}$` : "not available",
		};
	};

	return {
		loading,
		error,
		getAllCharacters,
		getCharacter,
		clearError,
		getAllComics,
		getComic,
		getCharacterByName,
	};
};

export default useMarvelService;
