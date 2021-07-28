import { useRef } from "react";
import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = ({ getSearch, pageBack }) => {
	const inputRef = useRef("");
	const handleSearch = (e) => {
		e.preventDefault();
		if (!inputRef.current.value) {
			return;
		}
		getSearch(inputRef.current.value);
		pageBack(true);
	};

	const handleEnter = (e) => {
		e.preventDefault();
		inputRef.current.value = "";
	};

	return (
		<>
			<form className="search">
				<SearchIcon className="search-icon" />
				<input
					type="text"
					ref={inputRef}
					onChange={handleSearch}
					placeholder="Search for a country..."
				/>
				<button type="submit" onClick={handleEnter}></button>
			</form>
		</>
	);
};

export default SearchBar;
