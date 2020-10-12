import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductService } from '../../services/domain/product.service';

@IonicPage()
@Component({
	selector: 'page-product-detail',
	templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

	item: Product;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public productService: ProductService) {
	}

	/** */
	ionViewDidLoad() {
		this.productService.findById(this.navParams.get('id')).subscribe((response) => {
			this.item = response;
			/** Buscar img */
			this.loadImageUrlsIfExists();

		}, error => { });
	}

	/** */
	loadImageUrlsIfExists() {
		this.productService.getImageFromBucket(this.item.id).subscribe((response) => {
			this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;

		}, error => { });
	}

}
