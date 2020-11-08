import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from './../../models/order';
import { CartItem } from './../../models/cart-item';
import { CartService } from './../../services/domain/cart.service';
import { Client } from '../../models/client';
import { Address } from '../../models/address';
import { ClientService } from '../../services/domain/client.service';
import { OrderService } from '../../services/domain/order.service';

@IonicPage()
@Component({
	selector: 'page-order-confirmation',
	templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

	order: Order;
	cartItens: CartItem[];
	client: Client;
	address: Address;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public cartService: CartService,
		public clientService: ClientService,
		public orderService: OrderService) {

		/** */
		this.order = this.navParams.get('order');
	}

	ionViewDidLoad() {
		console.log(this.order);

		this.cartItens = this.cartService.getCart().itens;
		console.log(this.cartItens);

		this.clientService.findById(this.order.cliente.id).subscribe(response => {
			this.client = response as Client;
			this.address = this.findAdress(this.order.enderecoDeEntrega.id, response['enderecos']);

		}, erros => {
			this.navCtrl.setRoot('HomePage');
		});
	}

	private findAdress(id: string, list: Address[]): Address {
		let i = list.findIndex(x => x.id = id);
		return list[i];
	}

	checkout() {
		this.orderService.insert(this.order).subscribe(response => {
			this.cartService.createOrClearCart();
			console.log(response.headers.get('location'));

		}, error => {
			if (error.status == 403) {
				this.navCtrl.setRoot('HomePage');
			}
		});
	}

	back() {
		this.navCtrl.setRoot('CartPage');
	}

	total() {
		return this.cartService.total();
	}
}
