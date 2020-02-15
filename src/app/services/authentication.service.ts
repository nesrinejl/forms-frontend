import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

import { User } from './../models/user.model';
import { Token } from './../models/token.model';

import { AUTH_BASE_URL, AUTH_ENDPOINTS } from './../constants/server-urls.constant';
import { MUTATING_JSON_REQUESTS_HTTP_OPTIONS, FETCHING_JSON_REQUESTS_HTTP_OPTIONS } from './../constants/http-options.constant';


@Injectable()
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) {}

    signUp(user: User): Observable<User> {

        const URL = AUTH_BASE_URL + AUTH_ENDPOINTS.SIGN_UP_ENDPOINT;

        return this.http.post<User>(URL, user, MUTATING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    signIn(email: string, password: string): Observable<Token> {

        const URL = AUTH_BASE_URL + AUTH_ENDPOINTS.SIGN_IN_ENDPOINT;

        return this.http.post<Token>(URL, { email, password }, MUTATING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    verifyToken(): Observable<void> {

        const URL = AUTH_BASE_URL + AUTH_ENDPOINTS.TOKEN_VERIFICATION_ENDPOINT;

        return this.http.get<void>(URL, FETCHING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    signOut(): void {

        this.localStorageService.removeToken();
        this.localStorageService.removeCurrentUser();

    }

}
