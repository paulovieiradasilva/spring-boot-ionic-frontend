import { Cart } from './../../models/cart';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Product } from '../../models/product';

@Injectable()
export class CartService {

	constructor(public storageService: StorageService) { }

	/** */
	createOrClearCart(): Cart {
		let cart: Cart = { items: [] };
		this.storageService.setCart(cart);

		return cart;
	}

	/** */
	getCart(): Cart {
		let cart: Cart = this.storageService.getCart();
		return cart == null ? cart = this.createOrClearCart() : cart;
	}

	/** */
	AddToCart(product: Product): Cart {
		let cart = this.getCart();
		let position = cart.items.findIndex(x => x.product.id == product.id);

		/** */
		if (position == -1) {
			cart.items.push({ quantity: 1, product });
		}

		this.storageService.setCart(cart);
		return cart;
	}

}
