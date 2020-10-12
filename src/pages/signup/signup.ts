import { ClientService } from '../../services/domain/client.service';
import { StateService } from '../../services/domain/state.service';
import { CityService } from '../../services/domain/city.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { City } from '../../models/city';
import { State } from '../../models/state';

@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {

	formGroup: FormGroup;
	states: State[];
	cities: City[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public formBuilder: FormBuilder,
		public cityService: CityService,
		public stateService: StateService,
		public clientService: ClientService,
		public alertCtrl: AlertController) {

		/** */
		this.formGroup = this.formBuilder.group({
			nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
			email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
			tipo: ['1', [Validators.required]],
			cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
			senha: ['123', [Validators.required]],
			logradouro: ['Rua Via', [Validators.required]],
			numero: ['25', [Validators.required]],
			complemento: ['Apto 3', []],
			bairro: ['Copacabana', []],
			cep: ['10828333', [Validators.required]],
			telefone1: ['977261827', [Validators.required]],
			telefone2: ['', []],
			telefone3: ['', []],
			estadoId: [null, [Validators.required]],
			cidadeId: [null, [Validators.required]]
		});
	}

	/** */
	ionViewDidLoad() {
		this.stateService.findAll().subscribe(response => {
			this.states = response;
			this.formGroup.controls.estadoId.setValue(this.states[0].id);
			this.updateCidades();

		}, error => { });
	}

	/** */
	updateCidades() {
		let state_id = this.formGroup.value.estadoId;
		this.cityService.findAll(state_id).subscribe(response => {
			this.cities = response;
			this.formGroup.controls.cidadeId.setValue(null);

		}, error => { });
	}

	/** */
	signupUser() {
		this.clientService.insert(this.formGroup.value).subscribe((response) => {
			this.showInsertOk();

		}, error => { });
	}

	/** */
	showInsertOk() {
		let alert = this.alertCtrl.create({
			title: 'Sucesso!',
			message: 'Cadastro efetuado com sucesso',
			enableBackdropDismiss: false,
			buttons: [
				{
					text: 'Ok',
					handler: () => {
						/** Desempilhar pagina pop() */
						this.navCtrl.pop();
					}
				}
			]
		});
		alert.present();
	}

	/** */
	login() {
		this.navCtrl.setRoot('HomePage');
	}

}
