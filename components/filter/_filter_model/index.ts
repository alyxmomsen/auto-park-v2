import { Brand, VehicleModel, Tariff } from '@/types';

export interface IFilterModel {
	brands: {
		name: string;
		code: 'brand';
		values: Brand[];
	};
	models: {
		name: string;
		type: 'model';
		values: VehicleModel[];
	};
	tarif: {
		name: string;
		type: 'tarif';
		values: Tariff[];
	};
}

export const filterFrame: IFilterModel = {
	brands: {
		name: 'Марка',
		code: 'brand',
		values: ['BMW', 'Chery', 'EXEED', 'Geely', 'Hyundai', 'Kia', 'Renault', 'Toyota'],
	},
	models: {
		name: 'Модель',
		type: 'model',
		values: [
			{
				brand: 'BMW',
				models: ['X2', 'X5'],
			},
			{
				brand: 'Chery',
				models: ['Arrizo 8', 'Tiggo 4', 'Tiggo 7 Pro', 'Tiggo 7 Pro Max', 'Tiggo 8 Pro Max'],
			},
			{
				brand: 'EXEED',
				models: ['LX', 'TXL', 'VX'],
			},
			{
				brand: 'Geely',
				models: ['Coolray'],
			},
			{
				brand: 'Hyundai',
				models: ['Sonata'],
			},
			{
				brand: 'Kia',
				models: ['K5', 'Optima', 'Rio'],
			},
			{
				brand: 'Renault',
				models: ['Logan'],
			},
			{
				brand: 'Toyota',
				models: ['Camry'],
			},
		],
	},
	tarif: {
		name: 'Тариф',
		type: 'tarif',
		values: [
			{ code: '13', name: 'Комфорт+' },
			{ code: '14', name: 'Комфорт' },
			{ code: '22', name: 'Комфорт2' },
			{ code: '26', name: 'Комфорт3' },
		],
	},
};
