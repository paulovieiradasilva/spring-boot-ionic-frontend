import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CartItem } from '../../models/cart-item';
import { ProductService } from '../../services/domain/product.service';
import { CartService } from '../../services/domain/cart.service';
import { Product } from '../../models/product';

@IonicPage()
@Component({
	selector: 'page-cart',
	templateUrl: 'cart.html',
})
export class CartPage {

	itens: CartItem[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public cartService: CartService,
		public productService: ProductService) {
	}

	/** */
	ionViewDidLoad() {
		let cart = this.cartService.getCart();
		this.itens = cart.itens;
		this.loadImageUrls();
	}

	/** */
	loadImageUrls() {
		for (let i = 0; i < this.itens.length; i++) {
			let item = this.itens[i];
			this.productService.getSmallImageFromBucket(item.product.id).subscribe((response) => {
				item.product.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.product.id}-small.jpg`;

			}, erros => { });
		}
	}

	/** */
	remove(product: Product) {
		this.itens = this.cartService.remove(product).itens;
	}

	/** */
	increase(product: Product) {
		this.itens = this.cartService.increase(product).itens;
	}

	/** */
	decrease(product: Product) {
		this.itens = this.cartService.decrease(product).itens;
	}

	/** */
	total() : number {
		return this.cartService.total();
	}

	/** */
	goOn() {
		this.navCtrl.setRoot('CategoryPage');
	}

	/** */
	checkout() {
		this.navCtrl.push('PickAddressPage');
	}

}
