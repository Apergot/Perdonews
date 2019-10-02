import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewsComponent } from './news/news.component';
import { NewComponent } from './new/new.component';



@NgModule({
  declarations: [
    NewsComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NewsComponent,
  ]
})
export class ComponentsModule { }
