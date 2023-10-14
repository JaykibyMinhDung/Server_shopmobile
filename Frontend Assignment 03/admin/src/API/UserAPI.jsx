import axiosClient from './axiosClient';

const UserAPI = {
	getAllData: (params) => {
		const url = '/users';
		return axiosClient.post(url, {...params});
	},

	getAllUser: (params) => {
		const url = '/users/all';
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

	getLogout: () => {
		const url = '/logout';
		return axiosClient.get(url)
	}
};

export default UserAPI;
