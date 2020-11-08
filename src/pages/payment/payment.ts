import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from './../../models/order';

@IonicPage()
@Component({
	selector: 'page-payment',
	templateUrl: 'payment.html',
})
export class PaymentPage {

	order: Order;
	plots: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	formGroup: FormGroup;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public FormBuilder: FormBuilder) {

		/** */
		this.order = this.navParams.get('order');

		this.formGroup = this.FormBuilder.group({
			numeroDeParcelas: [1, Validators.required],
			"@type": ['pagamentoComCartao', Validators.required]
		});
	}

	ionViewDidLoad() {
	}

	nextPage() {
		this.order.pagamento = this.formGroup.value;
		console.log(this.order);
	}

}
