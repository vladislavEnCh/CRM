import { IOverviewPage, IAnalyticsPage } from './../interfaces/interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<IOverviewPage> {
    return this.http.get<IOverviewPage>('/api/analytics/overview');
  }

  getAnalytics(): Observable<IAnalyticsPage> {
    return this.http.get<IAnalyticsPage>('/api/analytics/analytics');
  }
}
