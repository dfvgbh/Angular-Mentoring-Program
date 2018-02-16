import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPageComponent } from './modules/courses/components/courses-page';
import { CourseListComponent } from './modules/courses/components/courses-page';
import { AddCoursePageComponent } from './modules/courses/components/courses-page/add-course-page';
import { LoginPageComponent } from './modules/authentication/components/login-page';
import { PageNotFoundComponent } from './shared/components/page-not-found';
import { AuthGuard } from './auth-guard.service';
import { EditCoursePageComponent } from './modules/courses/components/courses-page/edit-course-page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses'
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'new',
        pathMatch: 'full',
        component: AddCoursePageComponent
      },
      {
        path: ':id',
        component: EditCoursePageComponent
      },
      {
        path: '',
        component: CourseListComponent
      }
    ]
  },
  {
    path: 'auth',
    component: LoginPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    AuthGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
