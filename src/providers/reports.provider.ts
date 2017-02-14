import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Report } from '../models/report';

@Injectable()
export class ReportProvider {
    
    constructor(public http: Http) { }

    // Load all reports
    load(): boolean {
        return true;

      }
}