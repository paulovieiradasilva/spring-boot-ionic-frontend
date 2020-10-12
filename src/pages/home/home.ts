import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { Credential } from '../../models/credential';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	creds: Credential = {
		email: '',
		senha: ''
	};

	constructor(
		public navCtrl: NavController,
		public menu: MenuController,
		public auth: AuthService
	) {

	}

	/** */
	ionViewWillEnter() {
		this.menu.swipeEnable(false);
	}

	/** */
	ionViewDidLeave() {
		this.menu.swipeEnable(true);
	}

	/** */
	ionViewDidEnter() {
		this.auth.refreshToken().subscribe((response) => {
			this.auth.successfulLogin(response.headers.get('Authorization'));
			this.navCtrl.setRoot('CategoryPage');

		}, error => { });
	}

	/** */
	login() {
		this.auth.authenticate(this.creds).subscribe((response) => {
			this.auth.successfulLogin(response.headers.get('Authorization'));
			this.navCtrl.setRoot('CategoryPage');

		}, error => { });
	}

	/** */
	signup() {
		this.navCtrl.push('SignupPage');
	}

}
