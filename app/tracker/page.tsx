import React from 'react';
import Tracker from './_components/tracker/tracker';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { service_getIfAuth } from '@/services/getIfAuth';


const Page = async () => {

	
	

	const ifAuth = await service_getIfAuth();

	const OPENED =
		true
		&& ifAuth && ifAuth.auth
		// && false
		;
	
	
	return OPENED ? (
		<div>
			<Tracker />
		</div>
	) : redirect('/');
};

export default Page;
