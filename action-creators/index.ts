import { Action, Brand, SET_BRAND, SET_BRAND_AS_SINGLE, SET_MODEL } from '@/types';

export const setModel = ({ brand, model }: { brand: Brand; model: string }): Action => {
	return {
		type: SET_MODEL,
		payload: {
			brand,
			model,
		},
	};
};

export const setBrand = ({ brand }: { brand: Brand }): Action => {
	return {
		type: SET_BRAND,
		payload: brand,
	};
};

export const setBrandAsSingle = ({ brand }: { brand: Brand }): Action => {
	return {
		type: SET_BRAND_AS_SINGLE,
		payload: brand,
	};
};