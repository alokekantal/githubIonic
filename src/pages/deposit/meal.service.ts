
import { Injectable } from '@angular/core';
import { Db } from '../../providers/db';

@Injectable()
export class MealService {
    constructor(public db: Db) {}

    getMembers(): any{
        var sql;
        var params = [];
        sql = "select * from Member";
        return new Promise<any>((resolve, reject) => {
            this.db.getRows(sql, params).then((members) => {
                resolve(members);
            });
        });
    }

    getMealDetail(toDayDate): any{
        var sql;
        var params = [];
        sql = "SELECT Meal.RecordId,Meal.MemberId,Name,Date,Day,Night,GuestDay,NoOfGuestDay,GuestNight,NoOfGuestNight FROM Meal JOIN Member WHERE Meal.MemberId = Member.MemberId AND Date = '"+toDayDate+"' ORDER BY Meal.MemberId";
        return new Promise<any>((resolve, reject) => {
            this.db.getRows(sql, params).then((membersMeals) => {
                resolve(membersMeals);
            });
        });
    }

    saveMealDetail(mealDetail): any{
        var sqls=[];
        var params = [];
        var sql="INSERT INTO Meal(MemberId,Date,Day,Night,GuestDay,NoOfGuestDay,GuestNight,NoOfGuestNight,UpdateDate,UserId) "+
                " SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ";
        sqls.push(sql);
        params.push ([ 
                    mealDetail.MemberId,
                    mealDetail.Date,
                    mealDetail.Day,
                    mealDetail.Night,
                    mealDetail.GuestDay,
                    mealDetail.NoOfGuestDay,
                    mealDetail.GuestNight,
                    mealDetail.NoOfGuestNight,
                    new Date(),
                    1                  
        ]);
        return new Promise<any>((resolve, reject) => {
            this.db.runMultyStatement(sqls, params).then((response) => {
                resolve(response);
            });
        })
    }

    updateMealDetail(mealDetail): any{
        var sqls=[];
        var params = [];
        var sql="UPDATE Meal SET Day = ?, Night = ?, GuestDay =?, NoOfGuestDay =?, GuestNight =?, NoOfGuestNight =?, UpdateDate = ?, UserId= ? WHERE RecordId = ? ";
        sqls.push(sql);
        params.push ([ 
                    
                    mealDetail.Day,
                    mealDetail.Night,
                    mealDetail.GuestDay,
                    mealDetail.NoOfGuestDay,
                    mealDetail.GuestNight,
                    mealDetail.NoOfGuestNight,
                    new Date(),
                    1,
                    mealDetail.RecordId                  
        ]);

        return new Promise<any>((resolve, reject) => {
            this.db.runMultyStatement(sqls, params).then((response) => {
                resolve(response);
            });
        })
    }
}