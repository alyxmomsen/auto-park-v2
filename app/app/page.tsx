'use client';

import React, { act, createContext, useContext, useEffect, useReducer, useState } from 'react';
import {
	Action,
	Brand,
	RESET_BRANDS,
	RESET_TARIFFES,
	SET_BACKGROUND,
	SET_BRAND,
	SET_BRAND_AS_SINGLE,
	SET_MODEL,
	SET_TARIFF,
	Tariff,
} from '@/types';
import Filter from '@/components/filter';
import axios from 'axios';
import Catalogue from '@/components/catalogue';
import { redirect } from 'next/navigation';
import { service_getIfAuth } from '@/services/getIfAuth';


// export

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
	tariffs: Tariff[];
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
	tariffs: [],
};

interface MainState {
	background: {
		color: string;
	};
	filterInstance: typeof filterInstance;
}

const initialState: MainState = {
	background: {
		color: '',
	},
	filterInstance,
};

export const mainReducer = (state: MainState, action: Action): MainState => {
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
						[action.payload.brand]: !state.filterInstance.models[action.payload.brand].find(
							(elem) => elem === action.payload.model
						)
							? [...state.filterInstance.models[action.payload.brand], action.payload.model]
							: [
									...state.filterInstance.models[action.payload.brand].filter(
										(elem) => elem !== action.payload.model
									),
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
		case RESET_BRANDS:
			return {
				...state,
				filterInstance: {
					...state.filterInstance,
					brands: [],
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
				},
			};
		case SET_TARIFF:
			return {
				...state,
				filterInstance: {
					...state.filterInstance,
					tariffs: state.filterInstance.tariffs.find((elem) => elem.code === action.payload.code)
						? [...state.filterInstance.tariffs.filter((elem) => elem.code != action.payload.code)]
						: [...state.filterInstance.tariffs, action.payload],
				},
			};
		case RESET_TARIFFES:
			return {
				...state,
				filterInstance: {
					...state.filterInstance,
					tariffs: [],
				},
			};
		default:
			return state;
	}
};

interface ContextModel {
	service: {
		dispatch: React.Dispatch<Action> | null;
	};
	model: MainState;
}

export const mainContext = createContext<ContextModel>({
	service: {
		dispatch: null,
	},
	model: initialState,
});

const App = async () => {
	const [state, dispatch] = useReducer(mainReducer, initialState);
	const [queryParams, setQueryParams] = useState('');

	const { data } = useGetCatalog(queryParams);

	useEffect(() => {
		// console.log(state.filterInstance.brands);
	}, [state.filterInstance.brands]);
	useEffect(() => {
		let str = '';

		for (const model in state.filterInstance.models) {
			const models = state.filterInstance.models[model as Brand];

			if (models.length) {
				models.forEach((elem) => {
					str += '&model[]=' + elem;
				});
			}
		}

		state.filterInstance.brands.forEach((brand) => {
			str += '&brand[]=' + brand;
		});

		state.filterInstance.tariffs.forEach((tarif) => {
			str += '&tarif[]=' + tarif.code;
		});

		setQueryParams(str);
		console.log({ str });
	}, [state.filterInstance.models, state.filterInstance.brands, state.filterInstance.tariffs]);

	const ifAuth = await service_getIfAuth();

	const OPENED =
		true
		&& ifAuth && ifAuth.auth
		&& false
		;

	return OPENED ? (
		<mainContext.Provider
			value={{
				model: state,
				service: {
					dispatch,
				},
			}}
		>
			<div className='catalogue' style={{ backgroundColor: state.background.color }}>
				<div className='catalogue__sidebar--left'>
					<h2>choisen vehicles:</h2>
					<div>models</div>
					<Filter />
				</div>
				<div className='catalogue__content'>
					{data ? <Catalogue content={data} /> : <div className='catalogue__preloader'>preloader...</div>}
				</div>
			</div>
		</mainContext.Provider>
	) : redirect('/') ;
};

function clickHandler(dispatch: React.Dispatch<Action>, action: Action) {
	dispatch(action);

	console.log(action);

	return 0;
}

export default App;

export interface Catalogmodel {
	result: number;
	page: number;
	pages: number;
	per_page: number;
	list: [
		{
			id: number;
			brand: string;
			model: string;
			number: string;
			price: number;
			image: string;
			tarif: string[];
		},
	];
}

export function useGetCatalog(queryParams: string): { data: Catalogmodel | null } {
	const ctx = useContext(mainContext);

	const [data, setData] = useState<Catalogmodel | null>(null);

	const baseURL = 'https://test.taxivoshod.ru/api/test/?w=catalog-cars';

	useEffect(() => {
		axios
			.get(baseURL + queryParams)
			.then((response) => {
				// console.log(response.data);
				const { data } = response;
				if (data) {
					setData(data);
				}
			})
			.catch((err) => err)
			.finally(() => {});
	}, [queryParams]);

	return {
		data,
	};
}

const arr = ['a', 2] as const;

const arr2: ['a', 'b', 'c'] = ['a', 'b', 'c'];

enum enm {
	a,
	b,
	c,
}

const z: enm = 0;

type t = typeof enm;

const x: t = enm;
