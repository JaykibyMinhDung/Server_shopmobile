import axiosClient from './axiosClient';

const ProductAPI = {
	getAPI: () => {
		const url = '/products';
		return axiosClient.get(url);
	},

	getCategory: (query) => {
		const url = `/products/category${query}`;
		return axiosClient.get(url);
	},

	getDetail: (id) => {
		const url = `/products/${id}`;
		return axiosClient.get(url);
	},

	getPagination: (query) => {
		const url = `/products/pagination${query}`;
		return axiosClient.get(url);
	},
	postNewProducts: (query) => {
		const url = `/products/new-product`;
		return axiosClient.post(url, {...query})
	},
	updatedProducts: (data, id) => {
		const url = `/products/updated-product/${id}`;
		return axiosClient.put(url,{...data})
	},
	deletedProducts: (id) => {
		const url = `/products/deleted-product/${id}`;
		return axiosClient.delete(url)
	}
};

export default ProductAPI;
