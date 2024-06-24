import { setBrand, setBrandAsSingle, setModel } from '@/action-creators';
import { mainContext, VehiclesState } from '@/app/app/page';
import { Action, Brand } from '@/types';
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
		values: {
			brand: Brand;
			models: string[];
		}[];
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

function FilterItem({
	state = true,
	item,
}: {
	state?: boolean;
	item: {
		brand: Brand;
		models: string[];
	};
}) {
  const ctx = useContext(mainContext);
  const { brands , models } = ctx.model.filterInstance;

	return (
		<div
			className='filter__item'
		>
			<h2
				className={`filter__item__brand${!/* ctx.model.filterInstance.brands */brands.length ? `` : !/* ctx.model.filterInstance.brands */brands.includes(item.brand) ? '--disabled' : ''}`}
				onClick={() => {
					if (ctx.controller.dispatch) {
						ctx.controller.dispatch(setBrand({ brand: item.brand }));
					}
				}}
			>
				<input onChange={(f) => f} checked={false ? true : false} type='checkbox' />
				brand: {item.brand}
			</h2>
			<div className={`filter__item__models`}>
				{item.models.map((model, i) => {
					return <FilterItemChild key={i} modelname={model} isParentChoisen={false} brandname={item.brand} />;
				})}
			</div>
		</div>
	);
}

function FilterItemChild({
	modelname,
	isParentChoisen,
	brandname,
}: {
	isParentChoisen: boolean;
	modelname: string;
	brandname: Brand;
}) {
	const [state, setState] = useState(false);

	const ctx = useContext(mainContext);

	useEffect(() => {
		if (!isParentChoisen) {
			setState(isParentChoisen);
		}
	}, [isParentChoisen]);

	return (
		<div
			onClick={() => {
				if (ctx.controller.dispatch) {
					ctx.controller.dispatch(setModel({ brand: brandname, model: modelname }));
				}
			}}
			className={`filter__item__models__item${!isParentChoisen ? ' --disabled' : ''}`}
		>
			<CustomCheckBox initState={state} dependency={isParentChoisen} />
			{modelname}
		</div>
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
