import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import {OverviewPage} from '../pages/overview/overview';

import { UsersPage } from '../pages/users/users';
import { DepositPage } from '../pages/deposit/deposit';
import { ReportMenuPage } from '../pages/report-menu/report-menu';
import { ViewTablePage } from '../pages/view-table/view-table';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 @ViewChild(Nav) nav: Nav;

  // make UsersPage the root (or first) page
  rootPage: any = OverviewPage;
  
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,  public menu: MenuController) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Overview', component: OverviewPage },
      { title: 'Users', component: UsersPage },
      { title: 'Deposit', component: DepositPage },
      { title: 'Report', component: ReportMenuPage },
      { title: 'View Table', component: ViewTablePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("aloke kantal");
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}