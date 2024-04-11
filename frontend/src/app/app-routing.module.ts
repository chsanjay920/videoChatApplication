import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSectionComponent } from './Component/create-section/create-section.component';
import { HomeComponent } from './Component/home/home.component';
import { ConnectComponent } from './Component/connect/connect.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'section', component: CreateSectionComponent },
  { path: 'connect', component: ConnectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
