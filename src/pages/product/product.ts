import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductService } from '../../services/domain/product.service';

@IonicPage()
@Component({
	selector: 'page-product',
	templateUrl: 'product.html',
})
export class ProductPage {

	itens: Product[] = [];
	page: number = 0;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public productService: ProductService,
		public loadingCtrl: LoadingController) {
	}

	/** */
	ionViewDidLoad() {
		this.loadData();
	}

	/** */
	loadData() {
		let loader = this.presentLoading();
		this.productService.findByCategoria(this.navParams.get('id'), this.page, 10).subscribe((response) => {
			let start = this.itens.length;
			this.itens = this.itens.concat(response['content']);
			let end = this.itens.length - 1;
			loader.dismiss();
			/** Buscar img */
			this.loadImageUrls(start, end);

		}, erros => {
			loader.dismiss();
		});
	}

	/** */
	loadImageUrls(start: number, end: number) {
		for (let i = start; i <= end; i++) {
			let item = this.itens[i];
			this.productService.getSmallImageFromBucket(item.id).subscribe((response) => {
				item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;

			}, erros => { });
		}
	}

	/** */
	showProdutoDetail(id: string) {
		this.navCtrl.push('ProductDetailPage', { id });
	}

	/** */
	presentLoading() {
		const loader = this.loadingCtrl.create({
			content: "Aguarde ..."
		});
		loader.present();

		return loader;
	}

	/** */
	doRefresh(refresher) {
		this.page = 0;
		this.itens = [];

		this.loadData();

		setTimeout(() => {
			refresher.complete();
		}, 1000);
	}

	/** */
	doInfinite(infiniteScroll) {
		this.page++;
		this.loadData();
		setTimeout(() => {
			infiniteScroll.complete();
		}, 1000);
	}
}
