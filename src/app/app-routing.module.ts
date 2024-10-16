import { Route, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NgModule } from '@angular/core';
import { BlogsComponent } from './blogs/blogs.component';

import { BlogsDetailComponent } from './blogs/blogs-detail/blogs-detail.component';
import { AuthGuard } from './authentication/auth.guard';

const appRoutes: Route[] = [
  {
    path: '',

    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },

  {
    path: 'blogs',
    component: BlogsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blogs-detail/:id',
    component: BlogsDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
