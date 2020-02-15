import { Injectable } from '@angular/core';

import { Token } from './../models/token.model';
import { User } from './../models/user.model';
import { RedirectUrl } from './../models/redirect-url.model';

import { TOKEN_KEY, CURRENT_USER_KEY, REDIRECT_URL_KEY } from './../constants/local-storage.constant';


@Injectable()
export class LocalStorageService {

    constructor() {}

    setToken(token: Token): void {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    }

    getToken(): Token {
        const TOKEN: string = localStorage.getItem(TOKEN_KEY);
        if (TOKEN === undefined || TOKEN === null || TOKEN === '{}' || TOKEN.trim() === '') {
            return null;
        } else {
            return JSON.parse(TOKEN);
        }
    }

    removeToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    }

    setCurrentUser(currentUser: User): void {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    }

    getCurrentUser(): User {
        const CURRENT_USER: string = localStorage.getItem(CURRENT_USER_KEY);
        if (CURRENT_USER === undefined || CURRENT_USER === null || CURRENT_USER === '{}' || CURRENT_USER.trim() === '') {
            return null;
        } else {
            return JSON.parse(CURRENT_USER);
        }
    }

    removeCurrentUser(): void {
        localStorage.removeItem(CURRENT_USER_KEY);
    }

    setRedirectUrl(redirectUrl: RedirectUrl): void {
        localStorage.setItem(REDIRECT_URL_KEY, JSON.stringify(redirectUrl));
    }

    getRedirectUrl(): RedirectUrl {
        const REDIRECT_URL: string = localStorage.getItem(REDIRECT_URL_KEY);
        if (REDIRECT_URL === undefined || REDIRECT_URL === null || REDIRECT_URL === '{}' || REDIRECT_URL.trim() === '') {
            return null;
        } else {
            return JSON.parse(REDIRECT_URL);
        }
    }

    removeRedirectUrl(): void {
        localStorage.removeItem(REDIRECT_URL_KEY);
    }

}
