import { Routes } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { ScoreSheetComponent } from './scoresheet';
import { LoginComponent } from './login/login.component';
import { UserGuard } from './shared/guard/user.guard';

export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
   { path: 'score', component: ScoreSheetComponent, canActivate: [ UserGuard ] },
   { path: '**',    component: NoContentComponent }
];
