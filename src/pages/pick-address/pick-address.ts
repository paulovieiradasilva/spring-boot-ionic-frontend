import { Address } from "./../../models/address";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-pick-address",
  templateUrl: "pick-address.html",
})
export class PickAddressPage {
  
  itens: Address[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.itens = [
      {
        id: "1",
        street: "Street 01",
        number: "10",
        complement: "Apt 01",
        neighborhood: "Neighbordhood 01",
        zip_code: "53000-000",
        city: {
          id: "1",
          name: "City 01",
          state: { id: "1", name: "State 01" },
        },
      },
      {
        id: "2",
        street: "Street 02",
        number: "20",
        complement: "Apt 02",
        neighborhood: "Neighbordhood 02",
        zip_code: "54000-000",
        city: {
          id: "2",
          name: "City 02",
          state: { id: "2", name: "State 02" },
        },
      },
    ];
  }
}
