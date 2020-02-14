import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppLibrariesModule } from './app-libraries.module';
import { AppServicesModule } from './app-services.module';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { FormComponent } from './components/form/form.component';


@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        ConfirmationDialogComponent,
        AppLayoutComponent,
        DashboardComponent,
        AddFormComponent,
        FormComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLibrariesModule,
        AppServicesModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
