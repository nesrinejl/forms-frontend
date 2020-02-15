import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LocalStorageService } from './../../services/local-storage.service';
import { FormService } from './../../services/form.service';

import { FormShareLinkDialogComponent } from './../form-share-link-dialog/form-share-link-dialog.component';

import { Form } from './../../models/form.model';
import { User } from './../../models/user.model';


@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

    forms: Form[] = [];

    ngOnInit() {
        this.loadForms(0);
    }

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private localStorageService: LocalStorageService,
        private formService: FormService
    ) {}

    loadForms(selectedTabIndex: number) {
        const CURRENT_USER: User = this.localStorageService.getCurrentUser();
        if (!CURRENT_USER) {
            return;
        }
        if (selectedTabIndex === 0) {
            this.formService.getFormsByUserId(CURRENT_USER._id).subscribe(
                (forms: Form[]) => {
                    this.forms = forms;
                },
                (error: any) => {
                    console.log(error);
                    this.forms = [];
                }
            );
        }
        if (selectedTabIndex === 1) {
            this.formService.getSubmittedFormsByUserId(CURRENT_USER._id).subscribe(
                (forms: Form[]) => {
                    this.forms = forms;
                },
                (error: any) => {
                    console.log(error);
                    this.forms = [];
                }
            );
        }
    }

    onCreateNewForm() {
        this.router.navigateByUrl('/app/add-form');
    }

    navigateToFormDetails(formId: string) {
        this.router.navigateByUrl('/app/form/' + formId);
    }

    onGetFormShareLink(formIndex: number) {
        const URL_PARTS: string[] = window.location.href.split('/');
        URL_PARTS[URL_PARTS.length - 1] = 'form';
        URL_PARTS.push(this.forms[formIndex]._id);
        const FORM_SHARE_LINK = URL_PARTS.join('/');
        const DIALOG_REF = this.dialog.open(
            FormShareLinkDialogComponent,
            {
                data: FORM_SHARE_LINK,
                width: '500px'
            }
        );

        DIALOG_REF.afterClosed().subscribe(result => {
            if (result === true) {
                this.snackBar.open('Form share link copied to clipboard!');
            }
        });
    }

}
