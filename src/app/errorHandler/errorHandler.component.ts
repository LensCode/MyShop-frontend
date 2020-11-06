import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    templateUrl:'./errorHandler.component.html'
})
export class ErrorHandlerComponent {

    constructor(
        public dialogRef: MatDialogRef<ErrorHandlerComponent>,
        @Inject(MAT_DIALOG_DATA) public data:any) {}
}