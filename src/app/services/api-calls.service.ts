import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  data = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getRecords(){
    // using http response 
    // return this.http.get('https://run.mocky.io/v3/216f4865-f3ef-4c3a-924a-6c3af5671b2a');
    
    //using subject
    return this.data.asObservable();
  }
  setRecords(data:any,body?: any){
    //using http request
    // let url ='#';
    // return this.http.post(url,body);

    //using subject
    this.data.next(data);
  }
}
