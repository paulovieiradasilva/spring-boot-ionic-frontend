import { STORAGE_KEYS } from './../config/storage-keys.config';
import { Injectable } from '@angular/core';
import { LocalUser } from './../models/local-user';
import { Cart } from '../models/cart';

@Injectable()
export class StorageService {

	constructor() { }

	/** */
	getLocalUser(): LocalUser {
		let user = localStorage.getItem(STORAGE_KEYS.user);
		return user == null ? null : JSON.parse(user);
	}

	/** */
	setLocalUser(obj: LocalUser) {
		(obj == null) ? localStorage.removeItem(STORAGE_KEYS.user) : localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(obj));
	}

	/** */
	getCart(): Cart {
		let cart = localStorage.getItem(STORAGE_KEYS.cart);
		return cart == null ? null : JSON.parse(cart);
	}

	/** */
	setCart(obj: Cart) {
		(obj == null) ? localStorage.removeItem(STORAGE_KEYS.cart) : localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
	}

}
