import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path: 'edit-data/:id', component: HomeComponent },
  {path:'', component: HomeComponent},
  // {path: '404', component: NotfoundComponent},
  // {path: '**', redirectTo: '404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 