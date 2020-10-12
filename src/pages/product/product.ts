import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductService } from '../../services/domain/product.service';

@IonicPage()
@Component({
	selector: 'page-product',
	templateUrl: 'product.html',
})
export class ProductPage {

	items: Product[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public productService: ProductService) {
	}

	/** */
	ionViewDidLoad() {
		this.productService.findByCategoria(this.navParams.get('id')).subscribe((response) => {
			this.items = response['content'];
			/** Buscar img */
			this.loadImageUrls();

		}, erros => { });
	}

	/** */
	loadImageUrls() {
		for (let i = 0; i < this.items.length; i++) {
			let item = this.items[i];
			this.productService.getSmallImageFromBucket(item.id).subscribe((response) => {
				item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;

			}, erros => { });
		}
	}

	/** */
	showProdutoDetail(id: string) {
		this.navCtrl.push('ProductDetailPage', { id });
	}
}
