import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {ArticlesRoutingModule} from './articles-routing.module';
import {ArticlesComponent} from './articles.component';

@NgModule({
  declarations: [ArticlesComponent],
  imports: [CommonModule, ArticlesRoutingModule, ScullyLibModule],
})
export class ArticlesModule {}
