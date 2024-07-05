'use client';

import { useStore } from 'effector-react';
import React from 'react';

import $store from '../../_store';

const EffectorApp = () => {
	const store = useStore($store);

	return (
		<div>
			<h1>Effector App</h1>
			<div>
        {[].map((todo: { id: number;text:string}) => (
					<div>
						<div>hello</div>
						<div>world</div>
						<div>foo</div>
						<div>bar</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default EffectorApp;
