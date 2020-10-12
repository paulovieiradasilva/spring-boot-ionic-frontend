import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
	selector: 'page-product',
	templateUrl: 'product.html',
})
export class ProductPage {

	items: Produto[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public produtoService: ProdutoService) {
	}

	/** */
	ionViewDidLoad() {
		this.produtoService.findByCategoria(this.navParams.get('id')).subscribe((response) => {
			this.items = response['content'];
			/** Buscar img */
			this.loadImageUrls();

		}, erros => { });
	}

	/** */
	loadImageUrls() {
		for (let i = 0; i < this.items.length; i++) {
			let item = this.items[i];
			this.produtoService.getSmallImageFromBucket(item.id).subscribe((response) => {
				item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;

			}, erros => { });
		}
	}

	/** */
	showProdutoDetail(id: string) {
		this.navCtrl.push('ProductDetailPage', { id });
	}
}
