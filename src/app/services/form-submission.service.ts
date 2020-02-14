import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { FormSubmission } from './../models/form-submission.model';

import { API_BASE_URL, API_ENDPOINTS } from './../constants/server-urls.constant';
import { MUTATING_JSON_REQUESTS_HTTP_OPTIONS } from './../constants/http-options.constant';


@Injectable()
export class FormSubmissionService {

    constructor(
        private http: HttpClient
    ) {}

    createFormSubmission(formSubmission: FormSubmission): Observable<any> {

        const URL = API_BASE_URL + API_ENDPOINTS.FORM_SUBMISSIONS_RESOURCE_ENDPOINTS.BASE_ENDPOINT;

        return this.http.post<any>(URL, formSubmission, MUTATING_JSON_REQUESTS_HTTP_OPTIONS);

    }

}
