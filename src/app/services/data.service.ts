import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private dataSource = new Subject<any>();
  dataType$ = this.dataSource.asObservable();


  sendData(data: any) {
    this.dataSource.next(data);
  }
}
