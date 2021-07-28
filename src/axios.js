import axios from "axios";

/* base url to make requests to the movie database */
const instance = axios.create({
	baseURL: "https://restcountries.eu/rest/v2",
});

export default instance;
