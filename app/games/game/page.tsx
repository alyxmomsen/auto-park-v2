// import { redirect } from 'next/dist/server/api-utils'
import { redirect } from 'next/navigation';
import React from 'react';

const page = () => {
	return redirect('/');
};

export default page;
