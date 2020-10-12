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

	items: CartItem[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public cartService: CartService,
		public productService: ProductService) {
	}

	/** */
	ionViewDidLoad() {
		let cart = this.cartService.getCart();
		this.items = cart.items;
		this.loadImageUrls();
	}

	/** */
	loadImageUrls() {
		for (let i = 0; i < this.items.length; i++) {
			let item = this.items[i];
			this.productService.getSmallImageFromBucket(item.product.id).subscribe((response) => {
				item.product.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.product.id}-small.jpg`;

			}, erros => { });
		}
	}

	/** */
	remove(product: Product) {
		this.items = this.cartService.remove(product).items;
	}

	/** */
	increase(product: Product) {
		this.items = this.cartService.increase(product).items;
	}

	/** */
	decrease(product: Product) {
		this.items = this.cartService.decrease(product).items;
	}

	/** */
	total() : number {
		return this.cartService.total();
	}

	/** */
	goOn() {
		this.navCtrl.setRoot('CategoryPage');
	}

}
