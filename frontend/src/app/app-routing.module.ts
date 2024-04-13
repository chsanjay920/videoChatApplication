import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSectionComponent } from './Component/create-section/create-section.component';
import { HomeComponent } from './Component/home/home.component';
import { ConnectComponent } from './Component/connect/connect.component';
import { Approach2Component } from './Component/approach2/approach2.component';
import { Client1Component } from './Component/client1/client1.component';
import { Client2Component } from './Component/client2/client2.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'section', component: CreateSectionComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'alternateapproach', component: Approach2Component },
  {path:'client1',component:Client1Component},
  {path:'client2',component:Client2Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
