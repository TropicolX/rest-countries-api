import React, { useState, useEffect } from "react";
import axios from "../axios";
import ReactPaginate from "react-paginate";
import Card from "./Card";

const Cards = ({ dataObject, pageBack, reset }) => {
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);
	const [selectedPage, setSelectedPage] = useState(0);
	const [perPage] = useState(8);
	const [pageCount, setPageCount] = useState(0);

	const handlePageClick = (e) => {
		pageBack(false);
		const page = e.selected + 1;
		setSelectedPage(e.selected);
		console.log(selectedPage);
		const newOffset = 8 * (page - 1);
		setOffset(newOffset);
	};

	useEffect(() => {
		const getData = async () => {
			let data = null;

			if (dataObject.length > 0) {
				data = dataObject;
			} else {
				const res = await axios.get(`/all`);
				data = res.data;
			}

			if (reset) {
				setOffset(0);
				setSelectedPage(0);
			}

			const slice = data.slice(offset, offset + perPage);
			const postData = slice.map((pd) => (
				<Card
					key={pd.numericCode}
					name={pd.name}
					image={pd.flag}
					population={pd.population}
					region={pd.region}
					capital={pd.capital}
				/>
			));
			setData(postData);
			setPageCount(Math.ceil(data.length / perPage));

			window.scrollTo(0, 0);
		};

		getData();
	}, [offset, perPage, dataObject, reset]);

	return (
		<>
			<div className="cards">{data}</div>
			<ReactPaginate
				previousLabel={"prev"}
				nextLabel={"next"}
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageCount={pageCount}
				forcePage={selectedPage}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
			/>
		</>
	);
};

export default Cards;
