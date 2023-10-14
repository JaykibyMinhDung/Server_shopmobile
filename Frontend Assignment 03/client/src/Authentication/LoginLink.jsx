import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { deleteSession } from '../Redux/Action/ActionSession';
import UserAPI from '../API/UserAPI';
// import alertify from 'alertifyjs';

function LoginLink(props) {
	const dispatch = useDispatch();
	
	const onRedirect = () => {
	const response = UserAPI.postLogout();
		localStorage.clear();
		if (response) {
			// alertify.set('notifier', 'position', 'bottom-left');
			// alertify.error('Bạn Đã Xóa Hàng Thành Công!');
			console.log(response?.meta)
		}
		const action = deleteSession('');
		dispatch(action);
	};

	return (
		<li className='nav-item' onClick={onRedirect}>
			<Link className='nav-link' to='/signin'>
				( Logout )
			</Link>
		</li>
	);
}

export default LoginLink;
