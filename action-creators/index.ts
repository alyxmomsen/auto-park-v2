import { Action, Brand, SET_MODEL } from '@/types';

export const setModel = ({ brand, model }: { brand: Brand; model: string }): Action => {
	return {
		type: SET_MODEL,
		payload: {
			brand,
			model,
		},
	};
};
