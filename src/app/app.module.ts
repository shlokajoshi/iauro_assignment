import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { ViewComponent } from './view/view.component';
import { FormModule } from './form/form.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ApiCallsService } from './services/api-calls.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    // FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormModule,
    // HttpClientModule,
    // material modules
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatNativeDateModule 
  ],
  providers: [ApiCallsService,MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
