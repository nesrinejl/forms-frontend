import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    templateUrl: './form-share-link-dialog.component.html',
    styleUrls: [ './form-share-link-dialog.component.scss' ]
})
export class FormShareLinkDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<FormShareLinkDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public formShareLink: string
    ) {}

    onCopyFormShareLink() {
        (document.getElementById('formShareLink') as any).select();
        document.execCommand('copy');
        this.dialogRef.close(true);
    }

}
