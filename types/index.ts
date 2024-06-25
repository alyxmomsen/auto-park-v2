export type Brand = 'BMW' | 'EXEED' | 'Geely' | 'Hyundai' | 'Kia' | 'Renault' | 'Toyota';

export type Tariff =
	| { code: '13'; name: 'Комфорт+' }
	| { code: '14'; name: 'Комфорт' }
	| { code: '22'; name: 'Комфорт2' }
	| { code: '26'; name: 'Комфорт3' };

export function tariffFabric(code: TarifCode): Tariff {
	switch (code) {
		case '13':
			return {
				code,
				name: 'Комфорт+',
			};
		case '14':
			return {
				code,
				name: 'Комфорт',
			};
		case '22':
			return {
				code,
				name: 'Комфорт2',
			};
		case '26':
			return {
				code,
				name: 'Комфорт3',
			};
	}
}

export type TarifCode = '13' | '14' | '22' | '26';
export type TarifName = 'Комфорт' | 'Комфорт' | 'Комфорт2' | 'Комфорт3';

export type ModelsAsIs =
	| { brand: 'BMW'; models: ('X2' | 'X5')[] }
	| { brand: 'Chery'; models: ('Arrizo 8' | 'Tiggo 4' | 'Tiggo 7 Pro' | 'Tiggo 7 Pro Max' | 'Tiggo 8 Pro Max')[] }
	| { brand: 'EXEED'; models: ('LX' | 'TXL' | 'VX')[] }
	| { brand: 'Geely'; models: 'Coolray'[] }
	| { brand: 'Hyundai'; models: 'Sonata'[] }
	| { brand: 'Kia'; models: ('K5' | 'Optima' | 'Rio')[] }
	| { brand: 'Renault'; models: 'Logan'[] }
	| { brand: 'Toyota'; models: 'Camry'[] };

export const SET_BACKGROUND = 'SET_BACKGROUND';
export const SET_MODEL = 'SET_MODEL';
export const SET_BRAND = 'SET_BRAND';
export const SET_BRAND_AS_SINGLE = 'SET_BRAND_SINGLE';
export const SET_TARIFF = 'SET_SET_TARIFF';

export type Action =
	| {
			type: typeof SET_BACKGROUND;
			payload: '#686';
	  }
	| {
			type: typeof SET_MODEL;
			payload: {
				brand: Brand;
				model: string;
			};
	  }
	| {
			type: typeof SET_BRAND;
			payload: Brand;
	  }
	| {
			type: typeof SET_BRAND_AS_SINGLE;
			payload: Brand;
	  }
	| {
			type: typeof SET_TARIFF;
			payload: Tariff;
	  };
