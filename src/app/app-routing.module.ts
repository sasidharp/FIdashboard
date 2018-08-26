import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableDisplayComponent } from './table-display/table-display.component';
import { AppComponent } from './app.component';
import { CharterComponent } from './charter/charter.component';

const routes: Routes = [
  { path: 'table/:id', component: TableDisplayComponent },
  { path: '', component: CharterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
