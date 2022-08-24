import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer } from 'rxjs';
import { DataLoaderService } from './data-loader.service';

describe('DataLoaderService', () => {
  let dataLoaderService: DataLoaderService;
  let httpClientSpy: { get: jasmine.Spy };
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataLoaderService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    dataLoaderService = TestBed.inject(DataLoaderService);
  });

  it('is created', () => {
    expect(dataLoaderService).toBeDefined();
  });

  it('call getJSON() and test second item.confirm is true', fakeAsync(() => {
    const testData = [
        {
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
        },
        {
          "stay": {
            "arrivalDate": "2021-11-01T04:00:00.000Z",
            "departureDate": "2021-11-04T04:00:00.000Z"
          },
          "room": {
            "roomSize": "presidential-suite",
            "roomQuantity": 2
          },
          "firstName": "IDM",
          "lastName": "PM",
          "email": "idm.op@idm.com",
          "phone": "123456789",
          "addressStreet": {
            "streetName": "IDM",
            "streetNumber": "1234"
          },
          "addressLocation": {
            "zipCode": "123456",
            "state": "Arkansas",
            "city": "OAK"
          },
          "extras": [
            "extraParking",
            "extraBalcony"
          ],
          "payment": "cash",
          "note": "lab test",
          "tags": [
            "angular",
            "material",
            "labtest"
          ],
          "reminder": true,
          "newsletter": false,
          "confirm": true
        }
    ]

    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(testData)));
    dataLoaderService.getJSON().subscribe( data => {
        expect(data[1].confirm).toBeTruthy();
    }) 
    tick();
  }));

});