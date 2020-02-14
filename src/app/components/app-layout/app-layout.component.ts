import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { LoaderService } from './../../services/loader.service';
import { AuthenticationService } from './../../services/authentication.service';

import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';

import { DialogData } from './../../models/dialog-data.model';


@Component({
    templateUrl: './app-layout.component.html',
    styleUrls: [ './app-layout.component.scss' ]
})
export class AppLayoutComponent implements OnInit, OnDestroy {

    displayLoader = false;
    loaderSubscription: Subscription;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private loaderService: LoaderService,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {

        this.loaderSubscription = this.loaderService.displayLoader().subscribe(
            (displayLoader) => this.displayLoader = displayLoader
        );

    }

    onSignOut() {

        const DIALOG_DATA: DialogData = {
            title: 'Sign out',
            content: 'You\'re about to be signed out, do you wish to proceed?'
        };

        const DIALOG_REF = this.dialog.open(
            ConfirmationDialogComponent,
            {
                data: DIALOG_DATA
            }
        );

        DIALOG_REF.afterClosed().subscribe(result => {
            if (result === true) {
                this.authenticationService.signOut();
                this.router.navigate(['/sign-in']);
            }
        });

    }

    ngOnDestroy() {

        if (this.loaderSubscription) {
            this.loaderSubscription.unsubscribe();
        }

    }

}
