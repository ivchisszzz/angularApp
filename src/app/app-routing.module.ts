import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertFormComponent } from './advert-form/advert-form.component';
import { AdvertComponent } from './advert/advert.component';
import { AuthGuard } from './guard/auth.guard';
import { NonAuthGuard } from './guard/non-auth.guard';

import { ListAdvertComponent } from './list-advert/list-advert.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: 'adverts',
    component: ListAdvertComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'adverts/createAdvert',
    component: AdvertFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/edit/:id',
    component: RegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'adverts/edit/:id',
    component: AdvertFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
