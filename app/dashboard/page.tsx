import { service_getIfAuth } from '@/services/getIfAuth';
import { redirect } from 'next/navigation';
import React from 'react';

const DashBoard = async () => {

	const ifAuth = await service_getIfAuth();

	const OPENED =
		true
		&& ifAuth && ifAuth.auth
		&& false
		;

	return OPENED ? (<div>DashBoard</div>) : redirect('/');
};

export default DashBoard;
