import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  headlinesPage = 0;
  actualCategory ='';
  actualPage = 0;

  constructor( private http: HttpClient) { }

  private executeQuery<T>(query: string){
    query = apiUrl+query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines(){
    this.headlinesPage++;
    return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategories(category: string){
    if(this.actualCategory == category){
      this.actualPage++;
    }else{
      this.actualPage =1;
      this.actualCategory = category;
    }
   return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=us&category=${category}&page=${this.actualPage}`);
  }
}
