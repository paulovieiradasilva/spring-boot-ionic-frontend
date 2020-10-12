import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Client } from '../../models/client';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from './../../services/storage.service';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {

	cliente: Client;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storageService: StorageService,
		public clientService: ClientService) {
	}

	ionViewDidLoad() {
		let localUser = this.storageService.getLocalUser();

		if (localUser && localUser.email) {
			this.clientService.findByEmail(localUser.email).subscribe(response => {
				this.cliente = response;
				/** Buscar img */
				this.getImageIfExists();

			}, error => {
				if (error.status == 403) {
					this.navCtrl.setRoot('HomePage');
				}
			});

		} else {
			this.navCtrl.setRoot('HomePage');
		}
	}

	/** */
	getImageIfExists() {
		this.clientService.getImageFromBucket(this.cliente.id).subscribe(response => {
			this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;

		}, error => { });
	}

}
