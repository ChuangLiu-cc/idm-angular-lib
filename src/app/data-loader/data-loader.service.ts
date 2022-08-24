import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class DataLoaderService {
    private jsonURL = './assets/reservations.json';

    constructor(private http: HttpClient){ }

    public getJSON(): Observable<any> {
        return this.http.get(this.jsonURL);
    }
}
