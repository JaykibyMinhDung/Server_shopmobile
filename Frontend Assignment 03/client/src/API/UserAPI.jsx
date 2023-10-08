import axiosClient from './axiosClient';

const UserAPI = {
	getAllData: (props) => {
		const url = '/login';
		return axiosClient.post(url, {...props});
	},

	postLogout: () => {
		const url = '/logout';
		return axiosClient.get(url);
	},

	getDetailData: (id) => {
		const url = `/users/${id}`;
		return axiosClient.get(url);
	},

	postSignUp: (query) => {
		const url = `/users/signup/${query}`;
		return axiosClient.post(url);
	},
};

export default UserAPI;
