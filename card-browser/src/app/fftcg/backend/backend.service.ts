import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap, catchError, switchMap, shareReplay } from 'rxjs';

import { ICard } from './resources/card';
import { ICube } from './resources/cube';
import { LoggingService } from 'src/app/logging.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private myJSONServerURL: string = 'http://localhost:3000';

  private myRefreshCardsSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  private myRefreshCubesSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  private request<ResourceType>(method: string, url: string, data?: any, responseType?: any): Observable<ResourceType> {
    // const token = this.oktaAuth.getAccessToken();

    return this.http.request<ResourceType>(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllCards(): Observable<ICard[]> {
    return this.myRefreshCardsSubject.pipe(
      switchMap(() => this.request<ICard[]>('get', `${this.myJSONServerURL}/cards`)),
      catchError(err => {
        this.loggingService.error(`Failed to retrieve all cards: ${err.message}`);
        throw err;
      }),
      tap(data => this.loggingService.log(`Retrieved ${data.length} cards`)),
      shareReplay(1),
    );
  }

  getAllCubes(): Observable<ICube[]> {
    return this.myRefreshCubesSubject.pipe(
      switchMap(() =>this.request<ICube[]>('get', `${this.myJSONServerURL}/cubes`)),
      catchError(err => {
        this.loggingService.error(`Failed to retrieve all cubes: ${err.message}`);
        throw err;
      }),
      tap(data => this.loggingService.log(`Retrieved ${data.length} cubes`)),
      shareReplay(1),
    );
  }
}
