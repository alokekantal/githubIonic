import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReportMenuService } from './report-menu.service';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-report-menu',
  templateUrl: 'report-menu.html'
})
export class ReportMenuPage {
  date:any;
  category: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: ReportMenuService) {
    this.initMenu();
    
  }

  initMenu(){   
    this.menuService.getCategory().then((category) => {
        this.category = category;
        console.log(this.category);
        this.category.push({
          CategoryId: 11, 
          CategoryName: "Meal"
        });
        this.category.push({
          CategoryId: 12, 
          CategoryName: "Deposit"
        });
        this.category.push({
          CategoryId: 13, 
          CategoryName: "Bill"
        });
      });
    }

  goToDetail(item){
    this.navCtrl.push(ItemDetailsPage , {item});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportMenuPage');
  }

}
