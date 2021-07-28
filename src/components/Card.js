import { Link } from "react-router-dom";

const Card = ({ name, image, population, region, capital }) => {
	return (
		<div className="card">
			<Link to={`/${name.toLowerCase()}`}>
				<img src={image} alt="" />
				<div className="card-content">
					<h1>{name}</h1>
					<p>
						Population: <span>{population.toLocaleString()}</span>
					</p>
					<p>
						Region: <span>{region}</span>
					</p>
					<p>
						Capital: <span>{capital ? capital : "N/A"}</span>
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Card;
