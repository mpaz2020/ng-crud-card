import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardModel } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private httClient: HttpClient) {}

  getCards(): Observable<CardModel[]> {
    return this.httClient
      .get<CardModel[]>(environment.baseUrl + '/list')
      .pipe(map((res) => res));
  }

  saveCard(request: any): Observable<any> {
    return this.httClient
      .post<any>(environment.baseUrl + '/save', request)
      .pipe(map((res) => res));
  }

  updateCard(request: any): Observable<any> {
    return this.httClient
      .post<any>(environment.baseUrl + '/update', request)
      .pipe(map((res) => res));
  }

  deleteCard(id: number): Observable<any> {
    return this.httClient
      .delete<any>(environment.baseUrl + '/delete/' + id)
      .pipe(map((res) => res));
  }
}
