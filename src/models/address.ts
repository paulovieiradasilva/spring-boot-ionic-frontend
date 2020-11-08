import { City } from './city';

export interface Address {
	id: string;
	street: string;
	number: string;
	complement: string;
	neighborhood: string;
	city: City;
	zip_code: string;
}