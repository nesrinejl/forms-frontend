import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LocalStorageService } from './services/local-storage.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { LoaderService } from './services/loader.service';
import { FormService } from './services/form.service';
import { FormSubmissionService } from './services/form-submission.service';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';


@NgModule({
    providers: [
        LocalStorageService,
        AuthenticationService,
        UserService,
        LoaderService,
        FormService,
        FormSubmissionService,
        AuthenticationGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
})
export class AppServicesModule { }
