import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx'
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input () new: Article;
  @Input () index: Number;
  @Input() atFavorites;

  constructor(
    private iab: InAppBrowser, 
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService
  ) {  }

  ngOnInit() {}

  openNew(){
    const browser = this.iab.create(this.new.url, '_system');
  }

  async launchMenu(){
    let saveDeleteBtn;
    if(this.atFavorites){
      saveDeleteBtn = {
        text: 'Delete from favorites',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.delteNewFromFavorites(this.new);
        }
      }
    }else{
      saveDeleteBtn = {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.saveNew(this.new);
        }
      }
    }

      const actionSheet = await this.actionSheetCtrl.create({
        buttons: [
        {
          text: 'Share',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            this.socialSharing.share(
              this.new.title,
              this.new.source.name,
              '',
              this.new.url
            );
          }
        },
        saveDeleteBtn,
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
    
      await actionSheet.present();
    
  }
}
