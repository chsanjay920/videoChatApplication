import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateSectionComponent } from './Component/create-section/create-section.component';
import { HomeComponent } from './Component/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { ConnectComponent } from './Component/connect/connect.component';
import { Approach2Component } from './Component/approach2/approach2.component';
import { Client1Component } from './Component/client1/client1.component';
import { Client2Component } from './Component/client2/client2.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSectionComponent,
    HomeComponent,
    ConnectComponent,
    Approach2Component,
    Client1Component,
    Client2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
