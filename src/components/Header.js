import { MoonIcon } from "@heroicons/react/outline";
import { SunIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Header = ({ themeToggle, dark, resetData }) => {
	return (
		<>
			<header>
				<h2>
					<Link to="/" onClick={resetData}>
						Where in the world?
					</Link>
				</h2>

				{dark ? (
					<div className="icon-container">
						<div className="header-icon-bg">
							<SunIcon
								className="header-icon"
								onClick={themeToggle}
							/>
						</div>
						<h3>Dark Mode</h3>
					</div>
				) : (
					<div className="icon-container">
						<div className="header-icon-bg">
							<MoonIcon
								className="header-icon"
								onClick={themeToggle}
							/>
						</div>
						<h3>Light Mode</h3>
					</div>
				)}
			</header>
		</>
	);
};

export default Header;
