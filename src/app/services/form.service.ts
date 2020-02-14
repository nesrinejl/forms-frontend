import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Form } from './../models/form.model';

import { API_BASE_URL, API_ENDPOINTS } from './../constants/server-urls.constant';
import { FETCHING_JSON_REQUESTS_HTTP_OPTIONS, MUTATING_JSON_REQUESTS_HTTP_OPTIONS } from './../constants/http-options.constant';


@Injectable()
export class FormService {

    constructor(
        private http: HttpClient
    ) {}

    getFormById(id: string): Observable<Form> {

        const URL = API_BASE_URL + API_ENDPOINTS.FORMS_RESOURCE_ENDPOINTS.BASE_ENDPOINT + '/' + id;

        return this.http.get<Form>(URL, FETCHING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    getFormsByUserId(id: string) {}

    getSubmittedFormsByUserId(id: string) {}

    createForm(form: Form): Observable<any> {

        const URL = API_BASE_URL + API_ENDPOINTS.FORMS_RESOURCE_ENDPOINTS.BASE_ENDPOINT;

        return this.http.post<any>(URL, form, MUTATING_JSON_REQUESTS_HTTP_OPTIONS);

    }

}
