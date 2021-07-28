import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import Cards from "./components/Cards";
import Details from "./components/Details";
import axios from "./axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	const [dark, setDark] = useState(false);
	const [data, setData] = useState([]);
	const [reset, setReset] = useState(false);

	const themeToggle = () => {
		setDark(!dark);
	};

	const resetData = () => {
		setData([]);
	};

	const getSearch = async (searchQuery) => {
		try {
			const res = await axios.get(`/name/${searchQuery}`);
			const result = res.data;
			setData(result);
		} catch (err) {
			console.log(err);
		}
	};

	const pageBack = (value) => {
		setReset(value);
	};

	const getRegion = async (query) => {
		try {
			const res = await axios.get(`/region/${query}`);
			console.log(query);
			const result = res.data;
			setData(result);
		} catch (err) {
			alert("We could not find any result for that region.");
			console.log(err);
		}
	};

	// To set default value when page is refreshed
	let defaultMode = false;
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		defaultMode = true;
	}

	useEffect(() => {
		setDark(defaultMode);
	}, [defaultMode]);

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (event) => {
			if (event.matches) {
				setDark(true);
			} else {
				setDark(false);
			}
		});

	return (
		<>
			<Router>
				<div className={`${dark && "dark"}`}>
					<Header
						themeToggle={themeToggle}
						dark={dark}
						resetData={resetData}
					/>
					<main>
						<Switch>
							<Route exact path="/">
								<div className="search-filter">
									<SearchBar
										getSearch={getSearch}
										pageBack={pageBack}
									/>
									<FilterBar
										handleClick={getRegion}
										pageBack={pageBack}
									/>
								</div>
								<Cards
									dataObject={data}
									reset={reset}
									pageBack={pageBack}
								/>
							</Route>

							<Route path="/:country">
								<Details resetData={resetData} />
							</Route>
						</Switch>
					</main>
				</div>
			</Router>
		</>
	);
}

export default App;
