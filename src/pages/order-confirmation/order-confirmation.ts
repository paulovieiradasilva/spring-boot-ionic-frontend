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
	codOrderId: string;

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
		this.cartItens = this.cartService.getCart().itens;

		this.clientService.findById(this.order.cliente.id).subscribe(response => {
			this.client = response as Client;
			this.address = this.findAdress(this.order.enderecoDeEntrega.id, response['enderecos']);

		}, erros => {
			this.navCtrl.setRoot('HomePage');
		});
	}

	private findAdress(id: string, list: Address[]) {
		let i = list.findIndex(x => x.id = id);
		return list[i];
	}

	private extractId(location: string): string {
		let i = location.lastIndexOf('/');

		return location.substring(i + 1, location.length);
	}

	checkout() {
		this.orderService.insert(this.order).subscribe(response => {
			this.cartService.createOrClearCart();
			this.codOrderId = this.extractId(response.headers.get('location'));

		}, error => {
			if (error.status == 403) {
				this.navCtrl.setRoot('HomePage');
			}
		});
	}

	back(n: number) {
		if (n == 1) {
			this.navCtrl.setRoot('CartPage');
		};
		if (n == 2) {
			this.navCtrl.setRoot('HomePage');
		}
	}

	total() {
		return this.cartService.total();
	}
}
