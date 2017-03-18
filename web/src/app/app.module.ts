import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ArchiveComponent } from './components/archive/archive.component';
import {ArticleService} from './services/article.service';
import {ScriptLoaderService} from './services/script-loader.service';
import { SmartDatePipe } from './pipes/smart-date.pipe';
import { AboutComponent } from './components/about/about.component';
import { DetailComponent } from './components/detail/detail.component';
import { DividerComponent } from './components/divider/divider.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SummaryComponent,
    ArchiveComponent,
    SmartDatePipe,
    AboutComponent,
    DetailComponent,
    DividerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InfiniteScrollModule
  ],
  providers: [ArticleService, ScriptLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
