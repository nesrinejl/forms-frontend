import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { LocalStorageService } from './../../services/local-storage.service';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';

import { customEmailValidator } from './../../utils/validators.util';

import { Token } from './../../models/token.model';
import { User } from './../../models/user.model';
import { RedirectUrl } from './../../models/redirect-url.model';


@Component({
    templateUrl: './sign-in.component.html',
    styleUrls: [ './sign-in.component.scss' ]
})
export class SignInComponent implements OnInit {

    signInFormGroup: FormGroup = this.formBuilder.group({
        email: [ '', Validators.required, customEmailValidator() ],
        password: [ '', Validators.required ]
    });

    hidePassword = true;
    showLoader = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private localStorageService: LocalStorageService,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {}

    ngOnInit() {

        this.authenticationService.verifyToken().subscribe(
            () => {
                this.router.navigate([ '/app/dashboard' ]);
            },
            (error: any) => {
                console.log(error);
                this.authenticationService.signOut();
            }
        );

    }

    onSignIn() {

        this.showLoader = true;

        this.authenticationService.signIn(this.signInFormGroup.get('email').value, this.signInFormGroup.get('password').value).subscribe(
            (token: Token) => {
                this.localStorageService.setToken(token);
                this.userService.getUserByEmail(this.signInFormGroup.get('email').value).subscribe(
                    (currentUser: User) => {
                        this.localStorageService.setCurrentUser(currentUser);
                        const REDIRECT_URL: RedirectUrl = this.localStorageService.getRedirectUrl();
                        if (REDIRECT_URL) {
                            this.router.navigate([ REDIRECT_URL.url ]);
                            this.localStorageService.removeRedirectUrl();
                        } else {
                            this.router.navigate([ '/app/dashboard' ]);
                            this.snackBar.open('Welcome to Forms!');
                        }
                        this.signInFormGroup.reset();
                        this.showLoader = false;
                    },
                    (error: any) => {
                        this.showLoader = false;
                        console.log(error);
                    }
                );
            },
            (error: any) => {
                this.showLoader = false;
                console.log(error);
                switch (error.status) {
                    case 401:
                        this.signInFormGroup.get('password').setErrors({ wrongPassword: true });
                        break;
                    case 404:
                        this.signInFormGroup.get('email').setErrors({ accountNotFound: true });
                        this.signInFormGroup.get('password').reset();
                        break;
                }
            }
        );

    }

}
