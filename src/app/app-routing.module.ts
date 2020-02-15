import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { FormComponent } from './components/form/form.component';


const APP_ROUTES: Routes = [
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'app',
        component: AppLayoutComponent,
        canActivate: [ AuthenticationGuard ],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'add-form',
                component: AddFormComponent
            },
            {
                path: 'form/:id',
                component: FormComponent
            },
            {
                path: '**',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
