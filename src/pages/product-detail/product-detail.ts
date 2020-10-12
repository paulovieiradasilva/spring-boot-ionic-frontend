import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
	selector: 'page-product-detail',
	templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

	item: Produto;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public produtoService: ProdutoService) {
	}

	/** */
	ionViewDidLoad() {
		this.produtoService.findById(this.navParams.get('id')).subscribe((response) => {
			this.item = response;
			/** Buscar img */
			this.loadImageUrlsIfExists();

		}, error => { });
	}

	/** */
	loadImageUrlsIfExists() {
		this.produtoService.getImageFromBucket(this.item.id).subscribe((response) => {
			this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;

		}, error => { });
	}

}
