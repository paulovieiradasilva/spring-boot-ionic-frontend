import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Address } from "./../../models/address";
import { StorageService } from './../../services/storage.service';
import { ClientService } from '../../services/domain/client.service';

@IonicPage()
@Component({
	selector: "page-pick-address",
	templateUrl: "pick-address.html",
})
export class PickAddressPage {

	itens: Address[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storageService: StorageService,
		public clientService: ClientService
	) { }

	ionViewDidLoad() {
		let localUser = this.storageService.getLocalUser();

		if (localUser && localUser.email) {
			this.clientService.findByEmail(localUser.email).subscribe(response => {
				this.itens = response['enderecos'];

			}, error => {
				if (error.status == 403) {
					this.navCtrl.setRoot('HomePage');
				}
			});

		} else {
			this.navCtrl.setRoot('HomePage');
		}
	}
}
