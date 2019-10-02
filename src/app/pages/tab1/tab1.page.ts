import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  news: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(){
    this.loadNews();
  }
  loadData(event){
    console.log(event);
    this.loadNews(event);
  }

  loadNews(event?){
    this.newsService.getTopHeadlines().
    subscribe( resp => {
        console.log('noticias',resp.articles);
        if(resp.articles.length == 0){
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.news.push(...resp.articles);
        if(event){
          event.target.complete();
        }
      }
    );
  }

}
