export type Brand = 'BMW' | 'EXEED' | 'Geely' | 'Hyundai' | 'Kia' | 'Renault' | 'Toyota';

export const SET_DATA = 'SET_DATA';
export const RESET_DATA = 'RESET_DATA';
export const SET_BACKGROUND = 'SET_BACKGROUND';
export const SET_VEHICLE_MODEL = 'SET_VEHICLE_MODEL';
export const SET_MODEL = 'SET_MODEL';

export type Action =
	| {
			type: typeof RESET_DATA;
			payload: undefined;
	  }
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
	  };
