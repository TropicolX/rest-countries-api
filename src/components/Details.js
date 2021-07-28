import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useParams } from "react-router-dom";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";

const Details = ({ resetData }) => {
	const [data, setData] = useState([]);
	const [borders, setBorders] = useState([]);
	const { country } = useParams();

	useEffect(() => {
		const getName = async (query) => {
			try {
				const all = await axios.get(`/all`);
				const allData = all.data;
				const countryData = allData.find(
					(item) => item.name.toLowerCase() === query
				);
				setData(countryData);
				const borderNames = allData
					.filter(
						(data) =>
							countryData.borders.includes(data.alpha3Code) ===
							true
					)
					.map((item) => item.name);
				setBorders(borderNames);
			} catch (err) {
				alert("We could not find any result for that country.");
				console.log(err);
			}
		};
		getName(country);
		window.scrollTo(0, 0);
	}, [country]);

	console.log(data);

	const generateStringFromArray = (array) => {
		if (array != null) {
			return array.map((item) => item.name).join(", ");
		}
		return;
	};

	const borderElements =
		borders.length > 0
			? borders.map((border) => (
					<Link key={border} to={`/${border.toLowerCase()}`}>
						<div className="border">
							<span>{border}</span>
						</div>
					</Link>
			  ))
			: "N/A";

	return (
		<div className="details">
			<Link to="/" className="back-button" onClick={resetData}>
				<ArrowNarrowLeftIcon className="icon" />
				Back
			</Link>

			<div className="details-content">
				<img src={data.flag} alt="" className="flag" />
				<div className="country-details">
					<h1>{data.name}</h1>
					<div className="row">
						<div className="column">
							<p>
								Native Name: <span>{data.nativeName}</span>
							</p>
							<p>
								Population:{" "}
								<span>
									{Intl.NumberFormat().format(
										data.population
									)}
								</span>
							</p>
							<p>
								Region: <span>{data.region}</span>
							</p>
							<p>
								Sub Region: <span>{data.subregion}</span>
							</p>
							<p>
								Capital: <span>{data.capital}</span>
							</p>
						</div>
						<div className="column">
							<p>
								Top Level Domain:{" "}
								<span>{data.topLevelDomain}</span>
							</p>
							<p>
								Currency:{" "}
								<span>
									{generateStringFromArray(data.currencies)}
								</span>
							</p>
							<p>
								Languages:{" "}
								<span>
									{generateStringFromArray(data.languages)}
								</span>
							</p>
						</div>
					</div>
					<div className="borders">
						<p>Border Countries: </p>
						<div className="borders-container">
							{borderElements}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;
