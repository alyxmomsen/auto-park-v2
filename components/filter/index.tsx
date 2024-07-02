import { resetBrands, resetTariffs, setBrand, setBrandAsSingle, setModel, setTariff } from '@/action-creators';
import { mainContext } from '@/app/app/page';
import { Action, Brand, /* Model, */ VehicleModel, TarifCode, Tariff, tariffFabric } from '@/types';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { filterFrame, IFilterModel } from './_filter_model';

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

const Filter = () => {
	const url = {
		filterModel: 'https://test.taxivoshod.ru/api/test/?w=catalog-filter',
	};

	const ctx = useContext(mainContext);

	const { data: filter, started, finished } = useAxios(url.filterModel);

	const [thefilter , ] = useState<IFilterModel>(filterFrame);

	thefilter.brands.values

	useEffect(() => {
		console.log({ filter, started, finished });
	}, [filter, started, finished]);

	return (
		<div className='filter'>
			<div className='filter__block-title'>
				<h2>Тарифы </h2>
				{ctx.model.filterInstance.tariffs.length > 1 ? (
					<button
						className={`filter__block-title__btn-clear`}
						onClick={() => {
							ctx.service.dispatch && ctx.service.dispatch(resetTariffs());
						}}
					>
						clear
					</button>
				) : null}
			</div>
			<div className='filter__tariff-options'>
				{filter
					? Object.getOwnPropertyNames(filter.tarif.values).map((elem) => {
							const currentTarifCode = elem as TarifCode;
							const tariffs = ctx.model.filterInstance.tariffs;

							return (
								<div
									className={`filter__tariff-options_item-container ${tariffs.find((tariff) => tariff.code === currentTarifCode) ? '--choisen' : ''}`}
								>
									<input
										checked={!!tariffs.find((tariff) => tariff.code === currentTarifCode)}
										type='checkbox'
									/>
									<div
										className={`filter-tariff-item ${tariffs.find((tariff) => tariff.code === currentTarifCode) ? '--choisen' : ''}`}
										onClick={() =>
											ctx.service.dispatch
												? ctx.service.dispatch(
														setTariff({
															tariff: tariffFabric(currentTarifCode),
														})
													)
												: null
										}
									>
										{tariffFabric(currentTarifCode).name}
									</div>
								</div>
							);
						})
					: null}
			</div>
			<div className={`filter__block-title`}>
				<h2>Модели</h2>{' '}
				{ctx.model.filterInstance.brands.length > 1 ? (
					<button
						onClick={() => {
							ctx.service.dispatch ? ctx.service.dispatch(resetBrands()) : null;
						}}
						className={`filter__block-title__btn-clear`}
					>
						clear
					</button>
				) : null}
			</div>
			<div className='filter__basic-options'>
				{(started && !finished && <div className='preloader--basic'>loading...</div>) || (
					<>{filter?.models.values.map((elem, i) => <FilterItem key={i} item={elem} />)}</>
				)}
			</div>
		</div>
	);
};

export default Filter;

function FilterItem({ state = true, item }: { state?: boolean; item: VehicleModel }) {
	const ctx = useContext(mainContext);
	const { brands } = ctx.model.filterInstance;

	return (
		<div className='filter__item'>
			<h2
				className={`filter__item__brand${!brands.length ? `` : !brands.includes(item.brand) ? ' --disabled' : ''}`}
				onClick={() => {
					if (ctx.service.dispatch) {
						ctx.service.dispatch(setBrand({ brand: item.brand as Brand }));
					}
				}}
			>
				<input onChange={(f) => f} checked={false ? true : false} type='checkbox' />
				brand: {item.brand}
			</h2>
			{(brands.includes(item.brand) || !brands.length) && (
				<div className={`filter__item__models ${brands.includes(item.brand) ? '--rolldown' : ''}`}>
					<FilterItemChilds modelname={item} isParentChoisen={false} />
				</div>
			)}
		</div>
	);
}

function FilterItemChilds({ modelname, isParentChoisen }: { isParentChoisen: boolean; modelname: VehicleModel }) {
	const [state, setState] = useState(false);

	const m = modelname;
	const { brand, models } = m;

	const ctx = useContext(mainContext);

	const { dispatch } = ctx.service;

	useEffect(() => {
		if (!isParentChoisen) {
			setState(isParentChoisen);
		}
	}, [isParentChoisen]);

	return (
		<>
			{models.map((elem, i) => (
				<div
					key={i}
					onClick={() =>
						ctx.service.dispatch
							? ctx.service.dispatch(setModel({ brand: brand as Brand, model: elem }))
							: null
					}
					className={`filter__item__models__item${true ? ' --disabled' : ''}`}
				>
					{ctx.model.filterInstance.models[brand].find((modelFromState) => modelFromState === elem) && 'okay'}
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

function useAxios(url: string) {
	const [data, setData] = useState<IFilterModel | null>(null);
	const [started, setStarted] = useState(false);
	const [finished, setFinished] = useState(false);

	useEffect(() => {
		console.log('axios start');
		setStarted(true);
		axios
			.get<IFilterModel>(url)
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

type x = Extract<VehicleModel, { brand: 'BMW' }>;

type m = keyof VehicleModel;
