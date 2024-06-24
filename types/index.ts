export type Brand = 'BMW' | 'EXEED' | 'Geely' | 'Hyundai' | 'Kia' | 'Renault' | 'Toyota';

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
