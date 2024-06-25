import { setBrand, setBrandAsSingle, setModel } from '@/action-creators';
import { mainContext, VehiclesState } from '@/app/app/page';
import { Action, Brand, Model, ModelsAsIs } from '@/types';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

const filterModel = {
	result: 1,
	brands: {
		name: 'Марка',
		code: 'brand',
		values: ['BMW', 'Chery', 'EXEED', 'Geely', 'Hyundai', 'Kia', 'Renault', 'Toyota'],
	},
	models: {
		name: 'Модель',
		type: 'model',
		values: [
			{ brand: 'BMW', models: ['X2', 'X5'] },
			{
				brand: 'Chery',
				models: ['Arrizo 8', 'Tiggo 4', 'Tiggo 7 Pro', 'Tiggo 7 Pro Max', 'Tiggo 8 Pro Max'],
			},
			{ brand: 'EXEED', models: ['LX', 'TXL', 'VX'] },
			{ brand: 'Geely', models: ['Coolray'] },
			{ brand: 'Hyundai', models: ['Sonata'] },
			{ brand: 'Kia', models: ['K5', 'Optima', 'Rio'] },
			{ brand: 'Renault', models: ['Logan'] },
			{ brand: 'Toyota', models: ['Camry'] },
		],
	},
	tarif: {
		name: 'Тариф',
		type: 'tarif',
		values: {
			'13': 'Комфорт+',
			'14': 'Комфорт',
			'22': 'Комфорт2',
			'26': 'Комфорт3',
		},
	},
};

type FilterModel = /* typeof filterModel */ {
	result: number;
	brands: {
		name: string;
		code: string;
		values: string[];
	};
	models: {
		name: string;
		type: string;
		// values: {
		// 	brand: Brand;
		// 	models:Model[];
		// }[];
		values: ModelsAsIs[];
	};
	tarif: {
		name: string;
		type: string;
		values: {
			'13': string;
			'14': string;
			'22': string;
			'26': string;
		};
	};
};

const Filter = () => {
	const url = {
		filterModel: 'https://test.taxivoshod.ru/api/test/?w=catalog-filter',
	};

	const { data: filter, started, finished } = useAxios(url.filterModel);

	useEffect(() => {
		console.log({ filter, started, finished });
	}, [filter, started, finished]);

	return (
		<div className='filter'>
			<h2>filter</h2>
			{(started && !finished && <div className='preloader--basic'>loading...</div>) || (
				<>{filter?.models.values.map((elem, i) => <FilterItem key={i} item={elem} />)}</>
			)}
		</div>
	);
};

export default Filter;

function useAxios(url: string) {
	const [data, setData] = useState<FilterModel | null>(null);
	const [started, setStarted] = useState(false);
	const [finished, setFinished] = useState(false);

	useEffect(() => {
		console.log('axios start');
		setStarted(true);
		axios
			.get<FilterModel>(url)
			.then((response) => {
				console.log('axios finished');
				const { data } = response;
				if (data) {
					setData(data);
				}
			})
			.catch((err) => err)
			.finally(() => {
				setFinished(true);
			});
	}, [url]);

	return {
		data,
		started,
		finished,
	};
}

function FilterItem({ state = true, item }: { state?: boolean; item: ModelsAsIs }) {
	const ctx = useContext(mainContext);
	const { brands, models } = ctx.model.filterInstance;

	const pn = Object.getOwnPropertyNames(item);

	// const mdls = brands.map((elem) => models[elem as Brand].map((elem) => elem));

	// mdls.find((elem) => elem.includes('Camry'));

	const m: Model = { BMW: ['X2', 'X5'] };

	m.BMW;

	return (
		<div className='filter__item'>
			<h2
				className={`filter__item__brand${!brands.length ? `` : !brands.includes(item.brand) ? ' --disabled' : ''}`}
				// onClick={() => {
				// 	if (ctx.controller.dispatch) {
				// 		ctx.controller.dispatch(setBrand({ brand: item.brand }));
				// 	}
				// }}
			>
				<input onChange={(f) => f} checked={false ? true : false} type='checkbox' />
				brand: {item.brand}
			</h2>

			<div className={`filter__item__models`}>
				{/* {item.models.map((model, i) => {
          
					return (
						<FilterItemChilds
							key={i}
							modelname={model}
							isParentChoisen={false}
							brandname={item.brand}
							isDisabled={!brands.length ? false : true}
						/>
					);
				})} */}
				<FilterItemChilds
					modelname={item}
					isParentChoisen={false}
					/* brandname={item.brand } */ isDisabled={!brands.length ? false : true}
				/>
			</div>
		</div>
	);
}

function FilterItemChilds({
	modelname,
	isParentChoisen,
	// brandname,
	isDisabled,
}: {
	isParentChoisen: boolean;
	modelname: ModelsAsIs;
	// brandname: Brand;
	isDisabled: boolean;
}) {
	const [state, setState] = useState(false);

	const m = modelname;
	const { brand, models } = m;

	useEffect(() => {
		if (!isParentChoisen) {
			setState(isParentChoisen);
		}
	}, [isParentChoisen]);

	return (
		<>
			{models.map((elem) => (
				<div className={`filter__item__models__item${isDisabled ? ' --disabled' : ''}`}>
					<CustomCheckBox initState={state} dependency={isParentChoisen} />
					{elem}
				</div>
			))}
		</>
	);
}

function CustomCheckBox({ initState, dependency }: { initState: boolean; dependency: boolean }) {
	const [state, setState] = useState(initState);

	useEffect(() => {
		setState(initState);
	}, [initState]);

	return (
		<input
			onChange={() => {}}
			disabled={!dependency ? true : false}
			checked={!dependency ? false : state}
			type='checkbox'
		/>
	);
}

// function modelsGetter(brand: Brand , models:ModelsAsIs):ModelsAsIs {
// 	switch (brand) {
// 		case 'BMW':

// 			const model: ModelsAsIs = {
// 				brand:'BMW' ,
// 				models:
// 			}
			
// 			return {
// 				brand: 'BMW',
// 				models:
// 			}
// 		case 'EXEED':
// 		case 'Geely':
// 		case 'Hyundai':
// 		case 'Kia':
// 		case 'Renault':
// 		case 'Toyota':

// 	}
// }

// { brand: 'BMW'; models: ('X2' | 'X5')[] }
// 	| { brand: 'Chery'; models: ('Arrizo 8' | 'Tiggo 4' | 'Tiggo 7 Pro' | 'Tiggo 7 Pro Max' | 'Tiggo 8 Pro Max')[] }
// 	| { brand: 'EXEED'; models: ('LX' | 'TXL' | 'VX')[] }
// 	| { brand: 'Geely'; models: 'Coolray'[] }
// 	| { brand: 'Hyundai'; models: 'Sonata'[] }
// 	| { brand: 'Kia'; models: ('K5' | 'Optima' | 'Rio')[] }
// 	| { brand: 'Renault'; models: 'Logan'[] }
// 		| { brand: 'Toyota'; models: 'Camry'[] };
	

		// type Model<T> = ReturnType<typeof Mode>