import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LocalStorageService } from './../services/local-storage.service';

import { Token } from './../models/token.model';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private localStorageService: LocalStorageService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const TOKEN: Token = this.localStorageService.getToken();

        if (TOKEN !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + TOKEN.token
                }
            });
        }

        return next.handle(request);

    }

}
