import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { LoaderService } from './../services/loader.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private loaderService: LoaderService,
        private snackBar: MatSnackBar
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loaderService.createLoader();

        return next.handle(request).pipe(
            tap(() => this.loaderService.dismissLoader()),
            retry(2),
            catchError(
                (error: HttpErrorResponse) => {

                    const URL = this.router.routerState.snapshot.url;

                    switch (error.status) {
                        case 400:
                            // TODO: bad request default error handling
                            break;
                        case 401:
                            if (!URL.startsWith('/sign-in')) {
                                this.snackBar.open('Sorry but your session has expired, you have to refresh your authentication!');
                                this.router.navigate(['/sign-in']);
                            }
                            break;
                        case 403:
                            // TODO: forbidden default error handling
                            break;
                        case 404:
                            // TODO: not found default error handling
                            break;
                        case 409:
                            // TODO: conflict default error handling
                            break;
                        case 500:
                            this.snackBar.open('Oups! Something went wrong, please try again later');
                            break;
                        case 503:
                            this.snackBar.open('This service is currently unavailable, please try again later!');
                            break;
                        default:
                            // TODO: default error handling
                            break;
                    }

                    this.loaderService.dismissLoader();

                    return throwError(error);

                }
            )
        );

    }

}
