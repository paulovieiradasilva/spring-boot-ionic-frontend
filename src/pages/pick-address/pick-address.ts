import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Address } from "./../../models/address";
import { StorageService } from "./../../services/storage.service";
import { ClientService } from "../../services/domain/client.service";
import { Order } from "../../models/order";
import { CartService } from "../../services/domain/cart.service";

@IonicPage()
@Component({
	selector: "page-pick-address",
	templateUrl: "pick-address.html",
})
export class PickAddressPage {

	itens: Address[];
	order: Order;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storageService: StorageService,
		public clientService: ClientService,
		public cartSerice: CartService
	) { }

	ionViewDidLoad() {
		let localUser = this.storageService.getLocalUser();

		if (localUser && localUser.email) {
			this.clientService.findByEmail(localUser.email).subscribe(
				(response) => {
					this.itens = response["enderecos"];

					let cart = this.cartSerice.getCart();

					/** */
					this.order = {
						cliente: { id: response["id"] },
						enderecoDeEntrega: null,
						pagamento: null,
						itens: cart.itens.map((x) => {
							return { quantidade: x.quantity, produto: { id: x.product.id } };
						}),
					};
				},
				(error) => {
					if (error.status == 403) {
						this.navCtrl.setRoot("HomePage");
					}
				}
			);
		} else {
			this.navCtrl.setRoot("HomePage");
		}
	}

	nextPage(item: Address) {
		this.order.enderecoDeEntrega = { id: item.id };
		this.navCtrl.push('PaymentPage', { order: this.order });
	}
}
