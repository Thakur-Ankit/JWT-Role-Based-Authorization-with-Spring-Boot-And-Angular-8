import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {DetailComponent} from './components/detail/detail.component';
import {AdminComponent} from './components/admin/admin.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {UnautorizedComponent} from './components/unautorized/unautorized.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER, Role.ADMIN]}
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },
  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnautorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
