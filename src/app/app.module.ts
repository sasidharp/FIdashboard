import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
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
import { CharterTableViewComponent } from './charter-table-view/charter-table-view.component';
import { Ng2Webstorage } from 'ngx-webstorage';
import { Customdatepipe } from './customDatepipe';
import { CustomTimepipe } from './CustomTimepipe';
import { Customjobstatus } from './customJobstatus';
import { Customsubarea } from './customSubarea';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HRcharterComponent } from './hrcharter/hrcharter.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    CharterComponent,
    MessagesComponent,
    TableDisplayComponent,
    CharterTableViewComponent,
    Customdatepipe,
    CustomTimepipe,
    Customjobstatus,
    Customsubarea,
    DialogComponent,
    LandingpageComponent,
    HRcharterComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatGridListModule,
    ChartsModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    Ng2Webstorage,
    MatDialogModule,
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
