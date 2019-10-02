import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ResponseTopHeadlines } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private newsService: NewsService) {}

  ngOnInit(){
    this.newsService.getTopHeadlines().
    subscribe( resp: ResponseTopHeadlines => {
        console.log('noticias',resp);
      }
    );
  }

}
