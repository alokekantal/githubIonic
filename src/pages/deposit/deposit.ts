import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { ExpenditureEntryService } from './expenditure-entry.service';
import { MealService } from './meal.service';
import { ExpDetail } from '../../models/expenditure';
import { Category } from '../../models/category';
import { DepositDetail } from '../../models/depositDetail';
import { MealDetail } from '../../models/mealDetail';

@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
  styles : [`
              .meal-text-box{border: 1px solid;height: 23px;border-radius: 5px;margin: 0px 5px;width: 40px;font-size:12px;}
              .backgroundColor{background-color: #F5F1E5;}
          `]
})
export class DepositPage {
  isDirty: boolean= false;
  //property for meal
  toDayDate : any;
  mealDetail = new MealDetail();
  allMemberMealDetail = [];
  filterMembersMealDetail: Array<MealDetail> ;
//property for expense
  subMenu: string = "expense";
  isAndroid: boolean = false;
  category: Array<Category>;
  members: Array<Object>;
  expDetail = new ExpDetail();
  expensesDetails: Array<ExpDetail>;
  depositDetail = new DepositDetail();
  showCount: boolean = false;
  package: number;

  memberDepositDetail : any = []; 
  depositDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform, public expenseService: ExpenditureEntryService, public mealService: MealService) {
    this.isAndroid = platform.is('android');
    this.initExpense();
  }

  changeSegment(){
    if(this.subMenu == "meal"){
      this.isDirty = false;
      this.toDayDate = this.getDate();
      this.initMeal().then(()=>{
        this.filterMembersMealDetail = this.allMemberMealDetail;
        this.getMealDetail();
      });
    }else if(this.subMenu == "expense"){
      this.isDirty = false;
      this.expDetail = new ExpDetail()
      this.expensesDetails = [];
      this.depositDetail = new DepositDetail();
      this.initExpense();
    }else if(this.subMenu == "deposit"){
      this.isDirty = false;
      this.memberDepositDetail = [];
      this.depositDetail = new DepositDetail();
      this.depositDate = this.getDate();
      this.initDeposit();
    }
  }
//START DEPOSIT SECTION
initDeposit(){
  this.depositDetail.Date = this.depositDate;
  this.expenseService.getMembers().then((members) => {
    this.members = members;
  });
}

getDepositDetail(){
  if(this.depositDetail.Date != null && this.depositDetail.MemberId != null){
    this.expenseService.getDeposit(this.depositDetail.Date, this.depositDetail.MemberId).then((deposit) => {
      var memberId = this.depositDetail.MemberId;
      var date =  this.depositDetail.Date;
      if(Object.getOwnPropertyNames(deposit).length != 0){
        this.depositDetail = deposit;        
      }else{
        this.depositDetail = new DepositDetail();
        this.depositDetail.RecordId = null;
        this.depositDetail.MemberId = memberId;
        this.depositDetail.Date = date;
      }
    });
    this.getMemberDepositDetail(this.depositDetail.Date, this.depositDetail.MemberId);  
  }  
}

getMemberDepositDetail(Date, MemberId){
  this.expenseService.getMemberDepositDetail(Date, MemberId).then((response) => {      
      if(Object.getOwnPropertyNames(response).length != 0){
        this.memberDepositDetail = response;
        this.depositDetail.TotalDeposit = 0;
        this.memberDepositDetail.forEach(s => this.depositDetail.TotalDeposit += s.Amount );
      }
    });
}

saveDeposit(depositDetail){
  if(depositDetail.RecordId === null){
      this.expenseService.saveDeposit(this.depositDetail).then((response)=>{
          this.getMemberDepositDetail(this.depositDetail.Date, this.depositDetail.MemberId);
          Toast.show("save successfully", "short", "center").subscribe(
            toast => {
                console.log(toast);
            });
      });
    }else{
      this.expenseService.updateDeposit(this.depositDetail).then((response)=>{
            Toast.show("Update successfully", "short", "center").subscribe(
              toast => {
                  console.log(toast);
              });
        });
    }    
}
//END DEPOSIT SECTION


//START MEAL SECTION
initMeal(): any {
  return new Promise<any>((resolve, reject) => {
      this.mealService.getMembers().then((members) => {
        members.forEach(member=>{
              var mealInit = new MealDetail();
              mealInit.RecordId = null;
              mealInit.Date = this.toDayDate;
              mealInit.MemberId = member.MemberId;
              mealInit.Name = member.Name;
              mealInit.Day = false;
              mealInit.Night = false;
              mealInit.GuestDay = false;
              mealInit.GuestNight = false;
              mealInit.showDetails = false;
              mealInit.icon = 'ios-add-circle-outline';
              this.allMemberMealDetail.push(mealInit);
          });
          resolve();
      }); 
    }); 
  }

    getMealDetail(){
    this.mealService.getMealDetail(this.toDayDate).then((membersMeals) => {
      if(membersMeals.length != 0){
        membersMeals.forEach(memberMeal=>{
          this.allMemberMealDetail.forEach(meal=>{
            if(meal.MemberId == memberMeal.MemberId){
              memberMeal.Day = (memberMeal.Day === 'true'? true : false);
              memberMeal.Night = (memberMeal.Night === 'true'? true : false);
              memberMeal.GuestDay = (memberMeal.GuestDay === 'true'? true : false);
              memberMeal.GuestNight = (memberMeal.GuestNight === 'true'? true : false);
              memberMeal.showDetails = false;
              memberMeal.icon = 'ios-add-circle-outline';
              var index = this.allMemberMealDetail.indexOf(meal);
              this.allMemberMealDetail[index] = memberMeal;                
            }
          });
        });
      }else{
        this.allMemberMealDetail = [];
        this.initMeal().then(()=>{
            this.filterMembersMealDetail = this.allMemberMealDetail;
        });
      }
      
    });
  }

  saveMealDetail(mealDetail){
      if(mealDetail.RecordId === null){
        this.mealService.saveMealDetail(mealDetail).then((response) => {
          Toast.show("Save successfully", "short", "center").subscribe(
                toast => {
                    console.log(toast);
                });
        });
      }else{
        this.mealService.updateMealDetail(mealDetail).then((response) => {
          Toast.show("Update successfully", "short", "center").subscribe(
                toast => {
                    console.log(toast);
                });
        });
      }
  }

  toggleDetails(data) {
     this.filterMembersMealDetail.forEach((meal) => {  // foreach statement  
        meal.showDetails = false;
        meal.icon = 'ios-add-circle-outline';             
    }) 
    if (data.showDetails) {     
        data.showDetails = false;
        data.icon = 'ios-add-circle-outline';
    } else {
        data.showDetails = true;
        data.icon = 'ios-remove-circle-outline';
    }
  }

  search(searchEvent) {
    let term = searchEvent.target.value.toLowerCase().trim();
    if (term === '') {
      this.allMemberMealDetail = this.filterMembersMealDetail
    } else {
      this.allMemberMealDetail = this.filterMembersMealDetail.filter(meal => meal.Name.toLowerCase().indexOf(term) >= 0);
    }
  }

//END MEAL SECTION


//START EXPENSE SECTION
  initExpense(){
    this.expDetail.Date = this.getDate();
    this.expenseService.getCategory().then((category) => {
      this.category = category;
    });
    this.expenseService.getMembers().then((members) => {
      this.members = members;
    });
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

  saveExpense(){
    this.depositDetail.Date = this.expDetail.Date;
    this.expDetail.ConsigneeId= this.depositDetail.MemberId;
        this.expenseService.saveExpense(this.expDetail).then((recordId)=>{
          this.depositDetail.ExpReferenceId = recordId.RecordId;
          if(this.depositDetail.IsPaidTo){
            if(this.validateToMemberDeposite()){
              this.expenseService.saveDeposit(this.depositDetail).then((response)=>{
                this.isDirty = false;
                Toast.show("save successfully", "short", "center").subscribe(
                  toast => {
                      console.log(toast);
                  });
              });
            }else{
              Toast.show("Provide deposit detail ", "short", "center").subscribe(
                  toast => {
                      console.log(toast);
                  });
            }
          }else{
            Toast.show("save successfully", "short", "center").subscribe(
                  toast => {
                      console.log(toast);
                  });
          }          
        });
  }

  validateToMemberDeposite(){
    if(this.depositDetail.MemberId!=null && this.depositDetail.Amount!=null){
      return true;
    }else{
      return false;
    }
  }

  getExpenseDetailByDateCat(){
    if(this.expDetail.Date != null && this.expDetail.CategoryId != null){
      var categoryId = this.expDetail.CategoryId;
      var date = this.expDetail.Date;

      this.expDetail = new ExpDetail();
      this.depositDetail = new DepositDetail();
      this.expDetail.CategoryId = categoryId;
      this.expDetail.Date = date;
      this.showCount = false;  

      switch(categoryId.toString()){                    
        case "4": this.showCount = true;
                  this.package = (this.category.filter(item=> item.CategoryId == this.expDetail.CategoryId))[0].Package;
                  this.expDetail.Count = this.expDetail.Price / this.package;
                  break;
        case "5": break;
        case "6": break;
      }
      
      this.expenseService.getExpenseDetailByDateCat(this.expDetail.Date.toString(), this.expDetail.CategoryId).then((expDetail) => {
          if(Object.getOwnPropertyNames(expDetail).length != 0){
              this.expensesDetails = expDetail;
          }
      });
    } 
  }

  setDepositAmount(){
    if(this.depositDetail.IsSameAmount){
        this.depositDetail.Amount = this.expDetail.Price;
    }
  }
//END EXPENSE SECTION

makeDirty(){
  this.isDirty = true;
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositPage');
  }

}
