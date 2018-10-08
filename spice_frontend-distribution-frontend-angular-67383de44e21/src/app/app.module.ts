import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NameRoutingModule, routedComponents } from './app.router';
import { DemoserviceService } from './services/demoservice.service';
import { LoaderService } from './services/loader.service';


import { AppComponent } from './app.component';

import { HeaderComponent } from './public/header.component';
import 'hammerjs';
// import { ConfirmationDialogComponent } from './public/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routedComponents,
    //ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NameRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  providers: [DemoserviceService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
