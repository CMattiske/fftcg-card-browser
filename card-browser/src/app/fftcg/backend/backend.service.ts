import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap, map, catchError, switchMap, shareReplay } from 'rxjs';

import { ICard } from './resources/card';
import { ICube } from './resources/cube';
import { LoggingService } from 'src/app/logging.service';
import { IDeckList } from './resources/deck-list';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private myJSONServerURL: string = 'http://localhost:3000';

  private myRefreshCardsSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  private myRefreshCubesSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  private myRefreshDeckListsSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  private request<ResourceType>(method: string, url: string, data?: any, responseType?: any): Observable<ResourceType> {
    // const token = this.oktaAuth.getAccessToken();

    return this.http.request<ResourceType>(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
      headers: method === 'get' ? {
        // Authorization: `Bearer ${token}`,
      } : {
        'Content-Type': 'application/json',
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

  createCard(card: ICard): Observable<ICard> {
    return this.request('post', `${this.myJSONServerURL}/cards`, JSON.stringify(card));
  }

  saveCard(card: ICard): Observable<ICard> {
    return this.request('put', `${this.myJSONServerURL}/cards/${card.id}`, JSON.stringify(card));
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

  createCube(cube: ICube): Observable<ICube> {
    return this.request('post', `${this.myJSONServerURL}/cubes`, JSON.stringify(cube));
  }

  saveCube(cube: ICube): Observable<ICube> {
    return this.request('put', `${this.myJSONServerURL}/cubes/${cube.id}`, JSON.stringify(cube));
  }

  deleteCube(cubeID: number): Observable<boolean> {
    return this.request('delete', `${this.myJSONServerURL}/cubes/${cubeID}`).pipe(map(() => true));
  }

  getAllDeckLists(): Observable<IDeckList[]> {
    return this.myRefreshDeckListsSubject.pipe(
      switchMap(() =>this.request<IDeckList[]>('get', `${this.myJSONServerURL}/deckLists`)),
      catchError(err => {
        this.loggingService.error(`Failed to retrieve all deck lists: ${err.message}`);
        throw err;
      }),
      tap(data => this.loggingService.log(`Retrieved ${data.length} deck lists`)),
      shareReplay(1),
    );
  }

  createDeckList(deckList: IDeckList): Observable<IDeckList> {
    return this.request('post', `${this.myJSONServerURL}/deckLists`, JSON.stringify(deckList));
  }

  saveDeckList(deckList: IDeckList): Observable<IDeckList> {
    return this.request('put', `${this.myJSONServerURL}/deckLists/${deckList.id}`, JSON.stringify(deckList));
  }

  deleteDeckList(deckListID: number): Observable<boolean> {
    return this.request('delete', `${this.myJSONServerURL}/deckLists/${deckListID}`).pipe(map(() => true));
  }
}
