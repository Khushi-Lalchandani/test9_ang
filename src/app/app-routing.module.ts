import { Route, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NgModule } from '@angular/core';
import { BlogsComponent } from './blogs/blogs.component';
import { AuthGuard } from './authentication/auth.guard';
import { BlogsDetailComponent } from './blogs/blogs-detail/blogs-detail.component';

const appRoutes: Route[] = [
  {
    path: '',

    redirectTo: '/blogs',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'blogs',
    component: BlogsComponent,
  },
  {
    path: 'blogs-detail/:id',
    component: BlogsDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
