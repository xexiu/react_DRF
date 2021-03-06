import React, { useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import LocalStorageServices from '../../services/LocalStorageService';

export default function SignUp() {
	const navigate = useNavigate();

	useEffect(() => {
		axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		LocalStorageServices.removeItems(['access_token', 'refresh_token', 'user']);
		axiosInstance.defaults.headers['Authorization'] = null;
		navigate('/login');
	});
	return <div>Logout</div>;
}
