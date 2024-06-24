import React from 'react';
import DashBoard from './page';

const DashboardLayout = ({ children, sidebar }: { children: React.ReactNode; sidebar: React.ReactNode }) => {
	return (
		<div className='dashboard'>
			<h1>DashboardLayout</h1>
			<div className='dashboard__side-bar'>{sidebar} </div>
			<div className='dashboard__main'>{children}</div>
		</div>
	);
};

export default DashboardLayout;
