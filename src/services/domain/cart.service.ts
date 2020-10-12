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
	add(product: Product): Cart {
		let cart = this.getCart();
		let position = cart.items.findIndex(x => x.product.id == product.id);

		console.log(product);
		

		/** */
		if (position == -1) {
			cart.items.push({ quantity: 1, product });
		}

		this.storageService.setCart(cart);
		return cart;
	}

	/** */
	remove(product: Product): Cart {
		let cart = this.getCart();
		let position = cart.items.findIndex(x => x.product.id == product.id);

		/** */
		if (position != -1) {
			cart.items.splice(position, 1);
		}

		this.storageService.setCart(cart);
		return cart;
	}

	/** */
	increase(product: Product): Cart {
		let cart = this.getCart();
		let position = cart.items.findIndex(x => x.product.id == product.id);

		/** */
		if (position != -1) {
			cart.items[position].quantity++;
		}

		this.storageService.setCart(cart);
		return cart;
	}

	/** */
	decrease(product: Product): Cart {
		let cart = this.getCart();
		let position = cart.items.findIndex(x => x.product.id == product.id);

		/** */
		if (position != -1) {
			cart.items[position].quantity--;

			/** */
			if (cart.items[position].quantity < 1) {
				cart = this.remove(product);
			}
		}

		this.storageService.setCart(cart);
		return cart;
	}

	/** */
	total(): number {
		let cart = this.getCart();
		let sum = 0;

		for (let i = 0; i < cart.items.length; i++) {
			sum += (cart.items[i].product.price * cart.items[i].quantity);
		}

		return sum;
	}

}
