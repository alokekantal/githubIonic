import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { ReportProvider } from '../../providers/reports.provider';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private reportProvider: ReportProvider, public platform: Platform, public actionsheetCtrl: ActionSheetController) {
     
  }

  ionViewDidLoad() {
    console.log('loading ReportsPage fast');
  }

}
