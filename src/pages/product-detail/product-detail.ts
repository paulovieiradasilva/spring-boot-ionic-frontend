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
		this.item = { id: '1', nome: 'Mouse', preco: 80.99 };
	}

}
