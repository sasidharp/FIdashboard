import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableDisplayComponent } from './table-display/table-display.component';
import { AppComponent } from './app.component';
import { CharterComponent } from './charter/charter.component';
import { CharterTableViewComponent } from './charter-table-view/charter-table-view.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  { path: 'table/:id', component: TableDisplayComponent },
  { path: 'tabular', component: CharterTableViewComponent },
  { path: '', component: LandingpageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
