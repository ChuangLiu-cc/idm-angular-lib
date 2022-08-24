import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { RoomSize } from '../reservation-form/reservation-form.component';
import { DataLoaderService } from '../data-loader/data-loader.service';
import { SearchBar } from 'idm-reservation-search-results-details-lib';


export interface SearchParam{
    name: string;
    arrival?: string;
    departure?: string;
    email?: string;
    phone?: string;
    room: string;
    note: string;
}
@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls:['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
    searchBar = new FormControl('');
    public reservations: any;
    public searchResults: any;
    public noSearchResults: any;
    
    roomSizes: RoomSize[] = [
        {value: 'business-suite', viewValue: 'Business Suite'},
        {value: 'presidential-suite', viewValue: 'Presidential Suite'}
    ];
    
    constructor(private dataLoaderService : DataLoaderService ,private dialog: MatDialog) { };

    // @HostListener('click') onClick() {
    //     console.log("hostli");
    //  }
    searchParam: SearchParam = { name:"", arrival: "", departure:"", email:"", phone: "", room: "", note:""};
    previousSearchParam: SearchParam = { name:"", arrival:"", departure:"", email:"", phone: "", room: "", note:""};
    ngOnInit() {
        //load data from json when loading page
        this.dataLoaderService.getJSON().subscribe(data=>{
            this.reservations = data;
            const htb = new SearchBar('search-bar-container',data);
            window.addEventListener("searchDone", (evt: Event) => {
                const searchDoneCustomEvent = evt as CustomEvent;
                this.searchResults = searchDoneCustomEvent.detail;
                this.displayResultListComponent(this.searchResults);
            });
            window.addEventListener("searchResultFlag", (evt: Event) => {
                const searchResultFlagCustomEvent = evt as CustomEvent;
                this.noSearchResults = searchResultFlagCustomEvent.detail;
            });
            window.addEventListener("clearSearchResult", (evt: Event) => {
                const clearSearchResultCustomEvent = evt as CustomEvent;
                this.searchResults = clearSearchResultCustomEvent.detail;
            })
        })
    }
    displayResultListComponent(result: any): void {
        const displayResultList = new CustomEvent("displayResultList", {detail: result});
        window.dispatchEvent(displayResultList);
    }
    public searchCustomers(searchParam: SearchParam): void{
        if(!searchParam.name && !searchParam.arrival && !searchParam.departure && !searchParam.email && !searchParam.phone && !searchParam.room && !searchParam.note) return;
        //check previous search param
        if(JSON.stringify(this.previousSearchParam) === JSON.stringify(searchParam)) return;
        //filter data by searchParam
        this.searchResults = this.reservations.filter((r:any)=> {
            return (searchParam.name ? (this.isStringInclude(r.firstName,searchParam.name) || this.isStringInclude(r.lastName, searchParam.name)) : true) &&  
            (searchParam.arrival ? this.isDateEqual(r.stay.arrivalDate, searchParam.arrival) : true) &&
            (searchParam.departure ? this.isDateEqual(r.stay.departureDate, searchParam.departure) : true) &&
            (searchParam.email ? this.isStringInclude(r.email, searchParam.email) : true) &&
            (searchParam.phone ? this.isStringInclude(r.phone, searchParam.phone) : true) &&
            (searchParam.room ? this.isStringInclude(r.room.roomSize, searchParam.room) : true) &&
            (searchParam.note ? this.isStringInclude(r.note, searchParam.note) : true)
        });
        this.previousSearchParam =  JSON.parse(JSON.stringify(searchParam));
        if(this.searchResults.length == 0)
            this.noSearchResults = true;
        else
            this.noSearchResults = false;
    }
    public clearSearchParam(): void{
        this.initSearchParam();
    }
    private initSearchParam(): void{
        this.searchParam = { name:"", arrival: "", departure:"", email:"", phone: "", room: "", note:""};
        this.searchResults = null;
        this.previousSearchParam = { name:"", arrival:"", departure:"", email:"", phone: "", room: "", note:""};
        this.noSearchResults = false;
    }
    private isStringInclude(originalString: string, searchString: string){
        if(!originalString || !searchString) return false;
        if(originalString.toLowerCase().includes(searchString.toLowerCase())){
            return true;
        }
        return false;
    }
    private isDateEqual(orginalDate: string, searchDate: string) {
        if(!orginalDate || !searchDate) return false;
        if(new Date(orginalDate).getTime() === new Date(searchDate).getTime()){
            return true;
        }
        return false;
    }
    // public popReservationDialog(searchResults: any): void {
    //     //popup reservation 
    //     const dialogRef = this.dialog.open(ReservationFormComponent, {
    //         width: '1200px',
    //         data: searchResults||null,
    //     });
      
    //     dialogRef.afterClosed().subscribe(result => {
    //     });
    // }
}