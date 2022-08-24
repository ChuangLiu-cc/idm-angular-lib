import { TestBed } from '@angular/core/testing';
import { ReservationFormComponent } from './reservation-form.component';

describe('ReservationFormComponent', () => {
    let reservationFormComponent: ReservationFormComponent;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
        ],
        declarations: [
            ReservationFormComponent
        ]
        }).compileComponents();
    });


    it('should create the ReservationFormComponent', () => {
        expect(ReservationFormComponent).toBeTruthy();
    });
    
});
