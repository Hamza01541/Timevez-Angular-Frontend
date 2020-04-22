import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var jQuery: any;


@Component({
    selector: 'confirmation-dialogue-component',
    templateUrl: 'confirmation.component.html',
    styleUrls: ['./confirmation.component.css']
})
export class ConfirmationDialogueComponent implements OnInit {
    dialogData: any;

    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data) {
            this.dialogData = data;
        }
    }

    ngOnInit() {

       
    }

    save() {
        this.dialogRef.close(this.dialogData);
    }
}