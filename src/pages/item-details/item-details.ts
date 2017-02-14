import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemService } from './item-detail.service';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
  styles:[`
            .backgroundColor{background-color: #F5F3F2;}
            .headerBackgroundColor{background-color: #A0C5FA;font-weight: bold}
          `]
})
export class ItemDetailsPage {
  date: any;
  selectedItem: any;
  detail: any = [];
  mealDetail: any = [];
  depositDetail: any = [];
  bill: any = [];
  headers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService) {
    this.selectedItem = navParams.get('item');
    this.init();
  }

  init(){
    this.date = this.getDate();
    this.getItemDetail();
  }

  getItemDetail(){
    if(this.selectedItem.CategoryId <= 10){
      this.itemService.getIExpensesDetail(this.date, this.selectedItem.CategoryId).then((itemDetail) => {        
        this.detail = itemDetail;
        this.headers = [];
        for (let key in this.detail[0]) {
          this.headers.push({key: key});
        }
      });
    }else if(this.selectedItem.CategoryId <= 11){

    }else if(this.selectedItem.CategoryId <= 12){
      this.itemService.getDepositDetail(this.date, this.selectedItem.CategoryId).then((itemDetail) => {        
        this.detail = itemDetail;
        this.headers = [];
        for (let key in this.detail[0]) {
          this.headers.push({key: key});
        }
      });
    }else if(this.selectedItem.CategoryId <= 13){
      
    }
  }  

  getDate(): any{
      var day = new Date().getDate();
      var month = new Date().getMonth()+1;
      var year = new Date().getFullYear();
      if(day < 10 && month < 10){
          return (year+"-0"+month+"-0"+day);
      }else if(day < 10){
          return (year+"-"+month+"-0"+day);
      }else if(month < 10){
          return (year+"-0"+month+"-"+day);
      }else{
        return (year+"-"+month+"-"+day);
      }
  }
}
