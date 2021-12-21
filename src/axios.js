import axios from "axios";
import LocalStorageServices from "./services/LocalStorageService";

const BASE_URL = 'http://127.0.0.1:8000/api/';

// const btoa = (str) => Buffer.from(str, 'utf8').toString('base64');
const atob = (str) => Buffer.from(str, 'base64').toString('utf8');


const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'Bearer ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

async function setRefreshToken(refreshToken) {
	try {
		const response = await axiosInstance
			.post('/token/refresh/', { refresh: refreshToken });
		return response;
	} catch (err) {
		console.log('There was an error setting the refresh token: ', err);
	}
}


axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const request = error.config;
		const { status, statusText, data } = error.response;
		const isTokenInValid = data.code === 'token_not_valid';
		const isUnAuthorized = isTokenInValid && statusText === 'Unauthorized';

		// Reject promise if usual error
		if (status !== 401 || typeof error.response === 'undefined') {
			console.log('Axios Interceptor error: ', error, 'Status: ', status)
			return Promise.reject(error);
		} else if (status === 401 && request.url === BASE_URL + 'token/refresh/') {
			window.location.href = '/login/';
			return Promise.reject(error);
		} else if (status === 401 && !request.headers.Authorization) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (isUnAuthorized) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
				const now = Math.ceil(Date.now() / 1000); // exp date in token is expressed in seconds, while now() returns milliseconds:
				const isExpiredTokenRefresh = tokenParts.exp < now;

				if (!isExpiredTokenRefresh) {
					const response = await setRefreshToken(refreshToken);
					LocalStorageServices.setItems({
						'access_token': response.data.access,
						'refresh_token': response.data.refresh
					});

					axiosInstance.defaults.headers['Authorization'] =
						'Bearer ' + response.data.access;
					request.headers['Authorization'] =
						'Bearer ' + response.data.access;

					return axiosInstance(request);

				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;
