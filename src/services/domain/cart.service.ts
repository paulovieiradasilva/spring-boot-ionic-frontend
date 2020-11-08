import { Cart } from './../../models/cart';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Product } from '../../models/product';

@Injectable()
export class CartService {

	constructor(public storageService: StorageService) { }

	/** */
	createOrClearCart(): Cart {
		let cart: Cart = { itens: [] };
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
		let position = cart.itens.findIndex(x => x.product.id == product.id);

		/** */
		if (position == -1) {
			cart.itens.push({ quantity: 1, product });
		}

		this.storageService.setCart(cart);
		return cart;
	}

	/** */
	remove(product: Product): Cart {
		let cart = this.getCart();
		let position = cart.itens.findIndex(x => x.product.id == product.id);

		/** */
		if (position != -1) {
			cart.itens.splice(position, 1);
		}

		this.storageService.setCart(cart);
		return cart;
	}

	/** */
	increase(product: Product): Cart {
		let cart = this.getCart();
		let position = cart.itens.findIndex(x => x.product.id == product.id);

		/** */
		if (position != -1) {
			cart.itens[position].quantity++;
		}

		this.storageService.setCart(cart);
		return cart;
	}

	/** */
	decrease(product: Product): Cart {
		let cart = this.getCart();
		let position = cart.itens.findIndex(x => x.product.id == product.id);

		/** */
		if (position != -1) {
			cart.itens[position].quantity--;

			/** */
			if (cart.itens[position].quantity < 1) {
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

		for (let i = 0; i < cart.itens.length; i++) {
			sum += (cart.itens[i].product.price * cart.itens[i].quantity);
		}

		return sum;
	}

}
