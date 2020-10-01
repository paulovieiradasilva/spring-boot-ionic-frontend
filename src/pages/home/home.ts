import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { Credenciais } from '../../models/credenciais';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	creds: Credenciais = {
		email: '',
		senha: ''
	}

	constructor(public navCtrl: NavController, public menu: MenuController) {

	}

	/** */
	ionViewWillEnter() {
		this.menu.swipeEnable(false);
	}

	/** */
	ionViewDidLeave() {
		this.menu.swipeEnable(true);
	}

	login() {
		console.log(this.creds);
		
		this.navCtrl.setRoot('CategoriasPage');
	}

}
