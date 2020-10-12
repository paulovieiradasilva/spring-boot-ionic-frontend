import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CategoryService } from '../../services/domain/category.service';

import { API_CONFIG } from '../../config/api.config';
import { Category } from '../../models/category';

@IonicPage()
@Component({
	selector: 'page-category',
	templateUrl: 'category.html',
})
export class CategoryPage {

	items: Category[];
	bucketUrl: string = API_CONFIG.bucketBaseUrl;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public categoryService: CategoryService
	) {
	}

	/** */
	ionViewDidLoad() {
		this.categoryService.findAll().subscribe((result: Category[]) => {
			this.items = result;

		}, error => { });
	}

	/** */
	showProducts(id: string) {
		this.navCtrl.push('ProductPage', { id });
	}

}
