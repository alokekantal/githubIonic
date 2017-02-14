import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {MomentModule} from 'angular2-moment';
import { MyApp } from './app.component';
import { UsersPage } from '../pages/users/users';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ExpenditureEntryService } from '../pages/deposit/expenditure-entry.service';
import { ItemService } from '../pages/item-details/item-detail.service';
import { ReportMenuService } from '../pages/report-menu/report-menu.service';
import { MealService } from '../pages/deposit/meal.service';
import { ReportMenuPage } from '../pages/report-menu/report-menu';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { DepositPage } from '../pages/deposit/deposit';
import { ViewTablePage } from '../pages/view-table/view-table';

import {OverviewPage} from '../pages/overview/overview';

import { Db } from '../providers/db';
import { GithubUsers } from '../providers/github-users';
import { ReportProvider } from '../providers/reports.provider';
import { KeysPipe } from '../providers/keys';

@NgModule({
  declarations: [
    MyApp,
    UsersPage,
    ItemDetailsPage,
    UserDetailsPage,
    OverviewPage,
    DepositPage,
    ReportMenuPage,
    ViewTablePage,
    KeysPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UsersPage,
    ItemDetailsPage,
    UserDetailsPage,
    OverviewPage,
    DepositPage,
    ReportMenuPage,
    ViewTablePage
    ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
              GithubUsers, 
              ReportProvider,
              Db, 
              KeysPipe, 
              ExpenditureEntryService,
              MealService,
              ItemService,
              ReportMenuService
              ]
})
export class AppModule {}
