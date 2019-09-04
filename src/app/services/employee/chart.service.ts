import { IResult } from '../../Core/result/result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ChartService {
    constructor(public httpClient: HttpClient) { }
    public getLeaveAllocationData(): Observable<IResult> {
        return this.httpClient.get<IResult>(`Chart/GetLeaveAllocationChartData`);//
    }

    public getOneWeekAttendanceData(): Observable<IResult> {

        return this.httpClient.get<IResult>(`Chart/GetOneWeekAttendanceChartData`);
    }
}