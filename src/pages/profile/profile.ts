import { CameraOptions, Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from './../../config/api.config';
import { Client } from '../../models/client';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from './../../services/storage.service';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {

	client: Client;
	picture: string;
	cameraOn: boolean = false;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storageService: StorageService,
		public clientService: ClientService,
		private camera: Camera) {
	}

	ionViewDidLoad() {
		let localUser = this.storageService.getLocalUser();

		if (localUser && localUser.email) {
			this.clientService.findByEmail(localUser.email).subscribe(response => {
				// this.client = response as Client;
				this.client = response;
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
		this.clientService.getImageFromBucket(this.client.id).subscribe(response => {
			this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`;

		}, error => { });
	}

	/** */
	getCameraPicture() {
		this.cameraOn = true;
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.PNG,
			mediaType: this.camera.MediaType.PICTURE
		};

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			this.picture = 'data:image/png;base64,' + imageData;
			this.cameraOn = false;
		}, (err) => {
			// Handle error
		});
	}

}
