import { Routes } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { ScoreSheetComponent } from './scoresheet';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
   { path: 'score', component: ScoreSheetComponent },
   { path: '**',    component: NoContentComponent }
];
