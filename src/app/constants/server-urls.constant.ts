export const SERVER_URL = 'https://cors-anywhere.herokuapp.com/https://formnodeproject.herokuapp.com';

export const API_ENDPOINTS_PREFIX = '/api/v1';
export const AUTH_ENDPOINTS_PREFIX = '/auth';

export const API_BASE_URL = SERVER_URL + API_ENDPOINTS_PREFIX;
export const AUTH_BASE_URL = SERVER_URL + AUTH_ENDPOINTS_PREFIX;

export const API_ENDPOINTS = {
    USERS_RESOURCE_ENDPOINTS: {
        BASE_ENDPOINT: '/users'
    },
    FORMS_RESOURCE_ENDPOINTS: {
        BASE_ENDPOINT: '/forms'
    },
    FORM_SUBMISSIONS_RESOURCE_ENDPOINTS: {
        BASE_ENDPOINT: '/form-submissions',
        SUBMITTED_FORMS_ENDPOINT: '/form-submissions/submitted'
    }
};

export const AUTH_ENDPOINTS = {
    SIGN_UP_ENDPOINT: '/signup',
    SIGN_IN_ENDPOINT: '/login',
    TOKEN_VERIFICATION_ENDPOINT: '/token-verification'
};
