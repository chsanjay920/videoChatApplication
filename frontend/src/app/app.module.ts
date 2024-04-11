import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateSectionComponent } from './Component/create-section/create-section.component';
import { HomeComponent } from './Component/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { ConnectComponent } from './Component/connect/connect.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSectionComponent,
    HomeComponent,
    ConnectComponent
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
