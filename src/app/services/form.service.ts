import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Form } from './../models/form.model';
import { FormStatistic } from './../models/form-statistic.model';

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

    getFormStatistics(id: string): Observable<FormStatistic> {

        const URL = API_BASE_URL + API_ENDPOINTS.FORMS_RESOURCE_ENDPOINTS.BASE_ENDPOINT + '/' + id + '/statistics';

        return this.http.get<FormStatistic>(URL, FETCHING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    getFormsByUserId(id: string): Observable<Form[]> {

        const URL = API_BASE_URL + API_ENDPOINTS.FORMS_RESOURCE_ENDPOINTS.BASE_ENDPOINT;

        const OPTIONS = { ...FETCHING_JSON_REQUESTS_HTTP_OPTIONS };
        OPTIONS.params = new HttpParams();
        OPTIONS.params = OPTIONS.params.set('userId', id);

        return this.http.get<Form[]>(URL, OPTIONS);

    }

    getSubmittedFormsByUserId(id: string): Observable<Form[]> {

        const URL = API_BASE_URL + API_ENDPOINTS.FORM_SUBMISSIONS_RESOURCE_ENDPOINTS.SUBMITTED_FORMS_ENDPOINT;

        const OPTIONS = { ...FETCHING_JSON_REQUESTS_HTTP_OPTIONS };
        OPTIONS.params = new HttpParams();
        OPTIONS.params = OPTIONS.params.set('userId', id);

        return this.http.get<Form[]>(URL, OPTIONS);

    }

    createForm(form: Form): Observable<any> {

        const URL = API_BASE_URL + API_ENDPOINTS.FORMS_RESOURCE_ENDPOINTS.BASE_ENDPOINT;

        return this.http.post<any>(URL, form, MUTATING_JSON_REQUESTS_HTTP_OPTIONS);

    }

}
