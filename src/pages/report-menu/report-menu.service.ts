import { Injectable } from '@angular/core';
import { Db } from '../../providers/db';

@Injectable()
export class ReportMenuService {
    constructor(public db: Db) {}
    
    getCategory(): any{
        var sql;
        var params = [];
        sql = " SELECT C.CategoryId, C.CategoryName, SUM(E.Price) Price "+
              " FROM Category C LEFT JOIN Expenditure E "+
              " ON E.CategoryId = C.CategoryId "+
              " GROUP BY C.CategoryId " 

        return new Promise<any>((resolve, reject) => {
            this.db.getRows(sql, params).then((category) => {
                resolve(category);
            });
        });
    }
}
