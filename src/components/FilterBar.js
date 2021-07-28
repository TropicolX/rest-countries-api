import { useState } from "react";
import Select from "react-select";

const FilterBar = ({ handleClick, pageBack }) => {
	const [option, setOption] = useState(null);

	const options = [
		{ value: "africa", label: "Africa" },
		{ value: "americas", label: "Americas" },
		{ value: "asia", label: "Asia" },
		{ value: "europe", label: "Europe" },
		{ value: "oceania", label: "Oceania" },
	];

	const dropdownStyles = {
		container: (styles) => ({
			...styles,
			height: "55px",
			fontSize: "1rem",
			color: "var(--text-color)",
			fontWeight: "600",
		}),
		control: (styles) => ({
			...styles,
			backgroundColor: "var(--element-bg-color)",
			color: "var(--text-color)",
			fontSize: "1rem",
			fontWeight: "600",
			border: "none",
			height: "55px",
			boxShadow: "var(--box-shadow)",
			borderRadius: "5px",
		}),
		valueContainer: (styles) => ({
			...styles,
			paddingLeft: "1.5rem",
			backgroundColor: "var(--element-bg-color)",
		}),
		indicatorSeparator: (styles) => ({
			...styles,
			display: "none",
		}),
	};

	const theme = (theme) => ({
		...theme,
		colors: {
			...theme.colors,
			primary25: "var(--page-bg-color)",
			neutral0: "var(--element-bg-color)",
			neutral80: "var(--text-color)",
		},
	});

	const handleAction = (option) => {
		setOption(option.value);
		handleClick(option.value);
		pageBack(true);
	};

	return (
		<div className="filter">
			<Select
				onChange={handleAction}
				styles={dropdownStyles}
				value={option}
				options={options}
				theme={theme}
				placeholder="Filter by Region"
				isSearchable={false}
				isClearable={false}
			/>
		</div>
	);
};

export default FilterBar;
