import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed,fakeAsync,tick,waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchBarComponent, SearchParam } from './search-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


describe('SearchBarComponent', () => {
    let searchBarComponent: SearchBarComponent;
    const testResultData = {
        "stay": {
          "arrivalDate": "2021-11-18T05:00:00.000Z",
          "departureDate": "2021-11-25T05:00:00.000Z"
        },
        "room": {
          "roomSize": "business-suite",
          "roomQuantity": 3
        },
        "firstName": "IDM",
        "lastName": "ENG",
        "email": "idm.test@idm.com",
        "phone": "9999999999",
        "addressStreet": {
          "streetName": "IDM Street",
          "streetNumber": "1234"
        },
        "addressLocation": {
          "zipCode": "123456",
          "state": "Arizona",
          "city": "OAKVILLE"
        },
        "extras": [
          "extraBreakfast",
          "extraTV",
          "extraWiFi",
          "extraParking",
          "extraBalcony"
        ],
        "payment": "cc",
        "note": "idm lab test",
        "tags": [
          "hotel",
          "booking",
          "labtest"
        ],
        "reminder": true,
        "newsletter": true,
        "confirm": false
      }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientTestingModule,
            MatDialogModule
        ],
        declarations: [
            SearchBarComponent
        ],
        providers: [
            { provide: [MAT_DIALOG_DATA,HttpClient] },
          ],
        }).compileComponents();
    });


    it('should create the SearchBarComponent', () => {
        expect(SearchBarComponent).toBeTruthy();
    });
    
});
