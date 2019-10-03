import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  news: Article[] = [];

  constructor(private storage: Storage,
              public toastController: ToastController) { 
    this.loadFavorites();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: message,
      duration: 1500
    });
    toast.present();
  }

  saveNew(notice : Article){
    const exists = this.news.find(actual => {
      actual.title === notice.title;
    });
    if(!exists)this.news.unshift(notice);
    this.storage.set('favorites', this.news);
    this.presentToast('Added to favorites');
  }

  async loadFavorites(){
    const favorites = await this.storage.get('favorites');
    if(favorites){
      this.news = favorites;
    }    
  }

  delteNewFromFavorites(notice: Article){
    this.news = this.news.filter(noti => noti.title !== notice.title);
    this.storage.set('favorites', this.news);
    this.presentToast('Removed from favorites');
  }
}
