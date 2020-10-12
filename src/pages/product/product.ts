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
		let id = this.navParams.get('id');
		this.produtoService.findByCategoria(id).subscribe((response) => {
			this.items = response['content'];

		}, erros => {});
	}

}
