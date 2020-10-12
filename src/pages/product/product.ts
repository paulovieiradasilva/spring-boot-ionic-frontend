import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Produto } from '../../models/produto';

@IonicPage()
@Component({
	selector: 'page-product',
	templateUrl: 'product.html',
})
export class ProductPage {

	items: Produto[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams) {
	}

	ionViewDidLoad() {
		this.items = [
			{ id: '1', nome: 'Mouse', preco: 80.99 },
			{ id: '2', nome: 'Teclado', preco: 100.00 }
		];
	}

}
