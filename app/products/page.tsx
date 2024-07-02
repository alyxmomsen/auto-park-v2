// 'use server'

import { service_getIfAuth } from '@/services/getIfAuth';
import axios from 'axios';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { Style } from 'util';

const flexContainerStyle = {};

const flexItemStyle = {
	border: '1px solid whitesmoke',
	padding: '9px',
	flex: '0 0 200',
};

const Products = async () => {
	const cks = cookies().getAll();

	const ifAuth = await service_getIfAuth();

	const OPENED =
		true
		&& ifAuth && ifAuth.auth
		&& false
		;
	
	return OPENED ? (
		<div className={`page-base`}>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					width: '600px',
					border: '1px solid red',
				}}
			>
				{cks.map((elem) => (
					<div style={{ ...flexItemStyle }}>
						<h3>{elem.name}</h3>
						<div>{elem.value}</div>
					</div>
				))}
			</div>
			hello from products
		</div>
	) : redirect('/');
};

export default Products;

function MyImage({ url }: { url: string }) {
	return <img className='image-wrapper--flex-container--flex-item' src={url} alt='no alt' width={200} height={200} />;
}
