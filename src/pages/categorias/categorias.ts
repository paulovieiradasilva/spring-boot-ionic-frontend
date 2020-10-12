import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CategoriaService } from '../../services/domain/categoria.service';

import { API_CONFIG } from './../../config/api.config';
import { Categoria } from '../../models/categoria';

@IonicPage()
@Component({
	selector: 'page-categorias',
	templateUrl: 'categorias.html',
})
export class CategoriasPage {

	items: Categoria[];
	bucketUrl: string = API_CONFIG.bucketBaseUrl;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public categoriaService: CategoriaService
	) {
	}

	/** */
	ionViewDidLoad() {
		this.categoriaService.findAll().subscribe((result: Categoria[]) => {
			this.items = result;

		}, error => { });
	}

}
