export type Brand = 'BMW' | 'EXEED' | 'Geely' | 'Hyundai' | 'Kia' | 'Renault' | 'Toyota';

export type Model =
	| { BMW: ('X2' | 'X5')[] }
	| { Chery: ('Arrizo 8' | 'Tiggo 4' | 'Tiggo 7 Pro' | 'Tiggo 7 Pro Max' | 'Tiggo 8 Pro Max')[] }
	| { EXEED: ('LX' | 'TXL' | 'VX')[] }
	| { Geely: 'Coolray'[] }
	| { Hyundai: 'Sonata'[] }
	| { Kia: ('K5' | 'Optima' | 'Rio')[] }
	| { Renault: 'Logan'[] }
	| { Toyota: 'Camry'[] };

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
	  };
