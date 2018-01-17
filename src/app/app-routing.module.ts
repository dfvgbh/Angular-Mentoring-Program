import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './modules/courses/components/courses-page';
import { CourseListComponent } from './modules/courses/components/courses-page';
import { AddCoursePageComponent } from './modules/courses/components/courses-page/add-course';
import { LoginPageComponent } from './modules/authentication/components/login-page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses'
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
    children: [
      {
        path: 'add',
        component: AddCoursePageComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
