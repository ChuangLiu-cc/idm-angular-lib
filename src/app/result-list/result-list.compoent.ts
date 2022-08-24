import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { ResultList } from 'idm-reservation-search-results-details-lib';

@Component({
    selector: 'app-result-list',
    templateUrl: './result-list.component.html',
    styleUrls:['./result-list.component.css']
})

export class ResultListComponent {
    @Input() searchResults: any;
    @Input() noSearchResults: any;
    details: any;
    displayedColumns: string[] = ['name', 'phone', 'email', 'note'];

    constructor(private dialog: MatDialog) { 
        window.addEventListener("displayResultList", (evt: Event) => {
            const displayResultListCustomEvent = evt as CustomEvent;
            const drl = new ResultList('result-list-container',displayResultListCustomEvent.detail);
            
        });
        window.addEventListener("clearSearchResult", (evt: Event) => {
            new ResultList('result-list-container',null);
        })
        window.addEventListener("clickRecordRow", (evt: Event) => {
            const clickRecordRowEvent = evt as CustomEvent;
            this.details = clickRecordRowEvent.detail;
            this.popupDetails(this.details);
        })
    };
    // public displayResultList():void{
    //     window.addEventListener("displayResultList", (evt: Event) => {
    //         new ResultList('result-list-container',this.searchResults);           
    //     });
    // }
    popupDetails(details: any) : void {
        const popDetailsEvent = new CustomEvent("popupDetails", {detail: details});
        window.dispatchEvent(popDetailsEvent);
    }

    public popReservationDialog(result: any): void {
        //popup reservation 
        const dialogRef = this.dialog.open(ReservationFormComponent, {
            width: '1200px',
            data: result||null,
        });
      
        dialogRef.afterClosed().subscribe(result => {
        });
    }
}