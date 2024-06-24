'use client';

import React, { act, createContext, useEffect, useReducer, useState } from 'react';
import { Action, Brand, SET_BACKGROUND, SET_BRAND, SET_BRAND_AS_SINGLE, SET_MODEL } from '@/types';
import Filter from '@/components/filter';

type VehicleModel =
	| { brand: 'BMW'; models: ('m1' | 'm2' | 'm3')[] }
	| { brand: 'Audi'; models: ('a1' | 'a2' | 'a3')[] };

// interface iVehicle {
//     brand: string;
//     models: string[];
// }

type BrandConfig =
	| { brand: 'BMW'; models: ('X2' | 'X5')[] }
	| {
			brand: 'Chery';
			models: ('Arrizo 8' | 'Tiggo 4' | 'Tiggo 7 Pro' | 'Tiggo 7 Pro Max' | 'Tiggo 8 Pro Max')[];
	  }
	| { brand: 'BMW'; models: ('X2' | 'X5')[] };

class Vehicle /*  implements iVehicle */ {
	brand: Brand;
	models: string[];
	constructor(brandConfig: BrandConfig) {
		this.brand = brandConfig.brand as Brand;
		this.models = brandConfig.models;
	}
}

// const v = new Vehicle();

export interface VehiclesState {
	BMW?: ('X2' | 'X5')[];
	Chery?: ('Arrizo 8' | 'Tiggo 4' | 'Tiggo 7 Pro' | 'Tiggo 7 Pro Max' | 'Tiggo 8 Pro Max')[];
	EXEED?: ('LX' | 'TXL' | 'VX')[];
	Geely?: 'Coolray'[];
	Hyundai?: 'Sonata'[];
	Kia?: ('K5' | 'Optima' | 'Rio')[];
	Renault?: 'Logan'[];
	Toyota?: 'Camry'[];
}

const filterInstance: {
	models: {
		BMW: ('X2' | 'X5')[];
		Chery: ('Arrizo 8' | 'Tiggo 4' | 'Tiggo 7 Pro' | 'Tiggo 7 Pro Max' | 'Tiggo 8 Pro Max')[];
		EXEED: ('LX' | 'TXL' | 'VX')[];
		Geely: 'Coolray'[];
		Hyundai: 'Sonata'[];
		Kia: ('K5' | 'Optima' | 'Rio')[];
		Renault: 'Logan'[];
		Toyota: 'Camry'[];
	};
	brands: string[];
} = {
	models: {
		BMW: [],
		Chery: [],
		EXEED: [],
		Geely: [],
		Hyundai: [],
		Kia: [],
		Renault: [],
		Toyota: [],
	},
	brands: [],
};

interface MainState {
	filter: {
		vehicles: VehiclesState;
	};
	background: {
		color: string;
	};
	filterInstance: typeof filterInstance;
}

const initialState: MainState = {
	filter: {
		vehicles: {
			BMW: ['X2'],
		},
	},
	background: {
		color: '',
	},
	filterInstance,
};

const mainReducer = (state: MainState, action: Action): MainState => {
	switch (action.type) {
		case SET_BACKGROUND:
			return state;
		case SET_MODEL:
			return {
				...state,
				filterInstance: {
					...state.filterInstance,
					models: {
						...state.filterInstance.models,
						[action.payload.brand]: [
							...state.filterInstance.models[action.payload.brand],
							action.payload.model,
						],
					},
				},
			};
		case SET_BRAND:
			return {
				...state,
				filterInstance: {
					...state.filterInstance,
					brands: [
						...(!state.filterInstance.brands.length
							? [action.payload]
							: state.filterInstance.brands.includes(action.payload)
								? [...state.filterInstance.brands.filter((elem) => elem !== action.payload)]
								: [...state.filterInstance.brands, action.payload]),
					],
				},
			};
		case SET_BRAND_AS_SINGLE:
			return {
				...state,
				filterInstance: {
					...state.filterInstance,
					brands: [action.payload],
				},
			};
		default:
			return state;
	}
};

interface ContextModel {
	controller: {
		dispatch: React.Dispatch<Action> | null;
	};
	model: MainState;
}

export const mainContext = createContext<ContextModel>({
	controller: {
		dispatch: null,
	},
	model: initialState,
});

const App = () => {
	const [state, dispatch] = useReducer(mainReducer, initialState);
	const [textInputValue, setTextInputValue] = useState('');

	useEffect(() => {
		console.log(state.filterInstance);
	}, [state]);

	return (
		<mainContext.Provider
			value={{
				model: state,
				controller: {
					dispatch,
				},
			}}
		>
			<div className='regular-container' style={{ backgroundColor: state.background.color }}>
				<div>
					<h2>choisen vehicles:</h2>
					<div>models</div>
					<Filter />
				</div>
			</div>
		</mainContext.Provider>
	);
};

function clickHandler(dispatch: React.Dispatch<Action>, action: Action) {
	dispatch(action);

	console.log(action);

	return 0;
}

export default App;

function insertModels() {}
