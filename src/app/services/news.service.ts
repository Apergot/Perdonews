import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient) { }

  getTopHeadlines(){
    return this.http.get<ResponseTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a89942fc4869443baf70f5de56d9be53`);
  }
}
