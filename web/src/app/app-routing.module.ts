import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SummaryComponent} from './components/summary/summary.component'
import {ArchiveComponent} from './components/archive/archive.component'
import {AboutComponent} from './components/about/about.component'
import {DetailComponent} from './components/detail/detail.component'

const routes: Routes = [
  {path: 'home', component: SummaryComponent},
  {path: 'archives', component: ArchiveComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'articles/:id', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
