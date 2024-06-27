import { Action, Brand, RESET_BRANDS, RESET_TARIFFES, SET_BRAND, SET_BRAND_AS_SINGLE, SET_MODEL, SET_TARIFF, Tariff } from '@/types';

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

export const resetBrands = ():Action => {
	return {
		type: RESET_BRANDS,
		payload:undefined ,
	}
}

export const setBrandAsSingle = ({ brand }: { brand: Brand }): Action => {
	return {
		type: SET_BRAND_AS_SINGLE,
		payload: brand,
	};
};

export const setTariff = ({ tariff }: { tariff: Tariff }): Action => {
	return {
		type: SET_TARIFF,
		payload: tariff,
	};
};

export const resetTariffs = (): Action => {
	return {
		type: RESET_TARIFFES,
		payload: undefined,
	};
};
