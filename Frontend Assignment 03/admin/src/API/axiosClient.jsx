// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
	baseURL: 'http://localhost:5000',
	withCredentials: true, // Accept server attack cookie
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
	const cookie = document.cookie ;
	// Handle token here ...
	const configCookie = decodeURIComponent(cookie).split(';');
	if (cookie?.length > 0) {
		config.headers['Cookie'] = `${cookie}` // set cookie send to server
	}
	config.headers['Authorization'] = `Bearer ${configCookie[0].split('=')[1]}`;
    // config.headers['Content-Type'] = 'multipart/form-data';
	return config;
});
axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		if (error) {
			return localStorage.removeItem("id_user")
		}
		// Handle errors
		throw error;
	}
);
export default axiosClient;
