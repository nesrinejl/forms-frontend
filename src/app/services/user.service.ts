import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from './../models/user.model';

import { API_BASE_URL, API_ENDPOINTS } from './../constants/server-urls.constant';
import { FETCHING_JSON_REQUESTS_HTTP_OPTIONS } from './../constants/http-options.constant';


@Injectable()
export class UserService {

    constructor(
        private http: HttpClient
    ) {}

    getUserByEmail(email: string): Observable<User> {

        const URL = API_BASE_URL + API_ENDPOINTS.USERS_RESOURCE_ENDPOINTS.BASE_ENDPOINT;

        const OPTIONS = { ...FETCHING_JSON_REQUESTS_HTTP_OPTIONS };
        OPTIONS.params = new HttpParams();
        OPTIONS.params = OPTIONS.params.set('email', email);

        return this.http.get<User>(URL, OPTIONS);

    }

}
