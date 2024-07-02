'use server';

import { cookies } from 'next/headers';

// import { cookies } from 'next/headers'

async function create() {
	//   cookies().set('name', 'lee')
	// or
	//   cookies().set('name', 'lee', { secure: true })
	// or
	cookies().set({
		name: 'name',
		value: 'lee',
		httpOnly: true,
		path: '/',
	});
}

export const GET = async (req: Request, res: Response) => {
    return new Response(JSON.stringify({auth:true}), {
		status: 201,
		statusText: 'it s okay',
	});
};