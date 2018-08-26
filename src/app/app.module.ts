import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { CharterComponent } from './charter/charter.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { TableDisplayComponent } from './table-display/table-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    CharterComponent,
    MessagesComponent,
    TableDisplayComponent,

  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    ChartsModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
,   MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
