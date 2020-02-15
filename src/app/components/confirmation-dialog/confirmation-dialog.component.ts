import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogData } from './../../models/dialog-data.model';


@Component({
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

}
