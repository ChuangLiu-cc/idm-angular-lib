import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { DetailsDialog,DetailsPopup } from 'idm-reservation-search-results-details-lib';


export interface RoomSize {
  value: string;
  viewValue: string;
}
export interface StateGroup {
  letter: string;
  names: string[];
}
export interface Payment {
  value: string;
  viewValue: string;
}
export interface Extra {
  value:string;
  viewValue: string;
}
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().includes(filterValue));
};
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  reservationForm = new FormControl('');
  arrivalDate = '';
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  roomSizes: RoomSize[] = [
    {value: 'business-suite', viewValue: 'Business Suite'},
    {value: 'presidential-suite', viewValue: 'Presidential Suite'}
  ];
  payments: Payment[] = [
    {value: 'cc', viewValue: 'Credit Card'},
    {value: 'pp', viewValue: 'PayPal'},
    {value: 'cash', viewValue: 'Cash'},
    {value: 'bc', viewValue: 'Bitcoin'}
  ]
  extras: Extra[] = [
    {value:'extraBreakfast', viewValue: 'Breakfast'},
    {value:'extraTV', viewValue: 'TV'},
    {value:'extraWiFi', viewValue: 'WiFi'},
    {value:'extraParking', viewValue: 'Parking'},
    {value:'extraBalcony', viewValue: 'Balcony'}
  ]
  // stateForm = this._formBuilder.group({
  //   stateGroup: '',
  // });
  // stateGroups: StateGroup[] = [
  //   {
  //     letter: 'A',
  //     names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
  //   },
  //   {
  //     letter: 'C',
  //     names: ['California', 'Colorado', 'Connecticut'],
  //   },
  //   {
  //     letter: 'D',
  //     names: ['Delaware'],
  //   },
  //   {
  //     letter: 'F',
  //     names: ['Florida'],
  //   },
  //   {
  //     letter: 'G',
  //     names: ['Georgia'],
  //   },
  //   {
  //     letter: 'H',
  //     names: ['Hawaii'],
  //   },
  //   {
  //     letter: 'I',
  //     names: ['Idaho', 'Illinois', 'Indiana', 'Iowa'],
  //   },
  //   {
  //     letter: 'K',
  //     names: ['Kansas', 'Kentucky'],
  //   },
  //   {
  //     letter: 'L',
  //     names: ['Louisiana'],
  //   },
  //   {
  //     letter: 'M',
  //     names: [
  //       'Maine',
  //       'Maryland',
  //       'Massachusetts',
  //       'Michigan',
  //       'Minnesota',
  //       'Mississippi',
  //       'Missouri',
  //       'Montana',
  //     ],
  //   },
  //   {
  //     letter: 'N',
  //     names: [
  //       'Nebraska',
  //       'Nevada',
  //       'New Hampshire',
  //       'New Jersey',
  //       'New Mexico',
  //       'New York',
  //       'North Carolina',
  //       'North Dakota',
  //     ],
  //   },
  //   {
  //     letter: 'O',
  //     names: ['Ohio', 'Oklahoma', 'Oregon'],
  //   },
  //   {
  //     letter: 'P',
  //     names: ['Pennsylvania'],
  //   },
  //   {
  //     letter: 'R',
  //     names: ['Rhode Island'],
  //   },
  //   {
  //     letter: 'S',
  //     names: ['South Carolina', 'South Dakota'],
  //   },
  //   {
  //     letter: 'T',
  //     names: ['Tennessee', 'Texas'],
  //   },
  //   {
  //     letter: 'U',
  //     names: ['Utah'],
  //   },
  //   {
  //     letter: 'V',
  //     names: ['Vermont', 'Virginia'],
  //   },
  //   {
  //     letter: 'W',
  //     names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
  //   },
  // ];

  stateGroupOptions?: Observable<StateGroup[]>;
  constructor(){
    window.addEventListener("popupDetails", (evt: Event) => {
      const popupDetailsCustomEvent = evt as CustomEvent;
      new DetailsPopup('details-popup-container',popupDetailsCustomEvent.detail);
    });
    window.addEventListener("clickPopup", (evt: Event) => {
      const clickPopupCustomEvent = evt as CustomEvent;
      if(clickPopupCustomEvent.detail.id == "details-popup-container"){
        clickPopupCustomEvent.detail.style.display = "none";
      }
    });

  }
  // constructor(
  //   public dialogRef: MatDialogRef<ReservationFormComponent>,private _formBuilder: FormBuilder,
  //   @Inject(MAT_DIALOG_DATA) public data: any
  // ) {

    
  // }


  // ngOnInit() {
  //   this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filterGroup(value || '')),
  //   );
  // }
  // private _filterGroup(value: string): StateGroup[] {
  //   if (value) {
  //     return this.stateGroups
  //       .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
  //       .filter(group => group.names.length > 0);
  //   }

  //   return this.stateGroups;
  // }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   if (value) {
  //     this.data.tags.push(value);
  //   }
  //   event.chipInput!.clear();
  // }

  // remove(tag: string): void {
  //   const index = this.data.tags.indexOf(tag);
  //   if (index >= 0) {
  //     this.data.tags.splice(index, 1);
  //   }
  // }



  


}