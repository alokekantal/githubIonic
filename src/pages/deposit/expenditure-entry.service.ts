import { Injectable } from '@angular/core';
import { Db } from '../../providers/db';

@Injectable()
export class ExpenditureEntryService {
    constructor(public db: Db) {}
    
    getCategory(): any{
        var sql;
        var params = [];
        sql = "select CategoryId, CategoryName, Package from Category";
        return new Promise<any>((resolve, reject) => {
            this.db.getRows(sql, params).then((category) => {
                resolve(category);
            });
        });
    }

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

    getExpenseDetailByDateCat(currentDate, CategoryId): any{
        var sql = "SELECT E.RecordId, E.CategoryId, E.Date, E.Description, "+       
                  "CASE WHEN "+CategoryId+"=4 THEN "+
                  "     E.Price/(select Package from Category where CategoryId = 4) "+
                  "ELSE "+
                  "     E.Price "+ 
                  "END Price,"+       
                  "E.ConsigneeId, M.Name, E.UpdateDate, E.UserId FROM Expenditure as E, Member M "+
                  "    WHERE E.ConsigneeId = M.MemberId AND E.Date= ? AND E.CategoryId = ?";
        var param =[currentDate, CategoryId];

        return new Promise<any>((resolve, reject) => {
            this.db.getRows(sql, param).then((expDetail) => {
                resolve(expDetail);
            });
        });     
    }

    getDepositDetail(RecordId): any{
        var sql = "SELECT D.RecordId AS RecordId, D.MemberId, D.Amount, D.ExpReferenceId FROM Deposit D WHERE D.ExpReferenceId = ?";
        var param =[RecordId];

        return new Promise<any>((resolve, reject) => {
            this.db.getRow(sql, param).then((deposit) => {
                resolve(deposit);
            });
        });
    }

    saveExpense(expDetail): any{
        var sqls=[];
        var params = [];
        var sql="INSERT INTO Expenditure(CategoryId, Date, Description, Price, ConsigneeId, UpdateDate, UserId) "+
                " SELECT ?, ?, ?, ?,?, ?, ? ";

        sqls.push(sql);
        params.push ([ 
                    expDetail.CategoryId,
                    expDetail.Date,
                    expDetail.Description,
                    expDetail.Price,
                    expDetail.ConsigneeId,
                    new Date(),
                    1
        ]);

        return new Promise<any>((resolve, reject) => {
            this.db.runMultyStatement(sqls, params).then((resp) => {
                var sql = "SELECT MAX(RecordId) RecordId FROM Expenditure WHERE CategoryId = ? AND Date = ?";
                var param = [expDetail.CategoryId, expDetail.Date];
                this.db.getRow(sql, param).then((RecordId) => {
                    resolve(RecordId);
                });
            });
        });        
    }

    saveDeposit(depositDetail): any{
        console.log(depositDetail);
        var sqls=[];
        var params = [];
        var sql = "INSERT INTO Deposit (MemberId, Date, Amount, ExpReferenceId, UpdateDate, UserId) "+
                  " SELECT ?, ?, ?, ?, ?, ?";
        sqls.push(sql);
        params.push ([ 
                    depositDetail.MemberId,
                    depositDetail.Date,
                    depositDetail.Amount,
                    depositDetail.ExpReferenceId,
                    new Date(),
                    1
        ]);

        return new Promise<any>((resolve, reject) => {
            this.db.runMultyStatement(sqls, params).then((response) => {
                resolve(response);
            });
        });
    }

    updateExpense(expDetail): any{
        var sqls=[];
        var params = [];
        var sql="UPDATE Expenditure SET CategoryId = ?, Date = ?, Description = ?, Price = ?, UpdateDate = ?, UserId = ? WHERE RecordId = ? ";
        sqls.push(sql);
        params.push ([ 
                    expDetail.CategoryId,
                    expDetail.Date,
                    expDetail.Description,
                    expDetail.Price,
                    new Date(),
                    1,
                    expDetail.RecordId                 
        ]);        
        return new Promise<any>((resolve, reject) => {
            this.db.runMultyStatement(sqls, params).then((expDetail) => {
                resolve(expDetail);
            });
        });        
    }

    updateDeposit(depositDetail): any{
        console.log(depositDetail);
        var sqls=[];
        var params = [];
        var sql = "UPDATE Deposit SET MemberId = ?,Date = ?, Amount = ?, UpdateDate = ?, UserId = ? WHERE RecordId = ? ";
        sqls.push(sql);
        params.push ([ 
                    depositDetail.MemberId,
                    depositDetail.Date,
                    depositDetail.Amount,
                    new Date(),
                    1,
                    depositDetail.RecordId
        ]);

        return new Promise<any>((resolve, reject) => {
            this.db.runMultyStatement(sqls, params).then((response) => {
                resolve(response);
            });
        });
    }

    getDeposit(depositDate, memberId){
        var sql = "SELECT D.RecordId AS RecordId, D.MemberId, D.Date, D.Amount, D.ExpReferenceId FROM Deposit D WHERE D.MemberId = "+memberId+" AND Date = '"+depositDate+"'";
        var param =[];
        console.log(sql+" "+ param);
        return new Promise<any>((resolve, reject) => {
            this.db.getRow(sql, param).then((deposit) => {
                resolve(deposit);
            });
        });
    }

    getMemberDepositDetail(depositDate, memberId){
        var sql = "SELECT D.RecordId AS RecordId, D.MemberId, D.Date, D.Amount, D.ExpReferenceId, C.CategoryName FROM Deposit D, Expenditure E, Category C "+
                  " WHERE E.RecordId = D.ExpReferenceId AND E.CategoryId = C.CategoryId AND D.MemberId = "+memberId+" AND strftime('%m', D.Date) = strftime('%m', '"+depositDate+"')";
        var param =[];
        console.log(sql+" "+ param);
        return new Promise<any>((resolve, reject) => {
            this.db.getRows(sql, param).then((response) => {
                resolve(response);
            });
        });
    }
}
