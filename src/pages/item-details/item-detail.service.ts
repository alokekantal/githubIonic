import { Injectable } from '@angular/core';
import { Db } from '../../providers/db';

@Injectable()
export class ItemService {
    constructor(public db: Db) {}

    getIExpensesDetail(date, CategoryId): any{
        var sql;
        var params = [];
        sql = "SELECT Date, Description, Price FROM Expenditure WHERE strftime('%m', `Date`) = strftime('%m', '"+date+"') AND CategoryId = "+CategoryId+" ORDER BY Date" ;
        
        return new Promise<any>((resolve, reject) => {
            this.db.getRows(sql, params).then((response) => {
                resolve(response);
            });
        });
    }

    getDepositDetail(date, CategoryId): any{
        var sql;
        var params = [];
        sql = "SELECT Date, Description, Price FROM Expenditure WHERE strftime('%m', `Date`) = strftime('%m', '"+date+"') AND CategoryId = "+CategoryId+" ORDER BY Date" ;
        
        return new Promise<any>((resolve, reject) => {
            this.db.getRows(sql, params).then((response) => {
                resolve(response);
            });
        });
    }
}