import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../services/api-calls.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

   ELEMENT_DATA: any = [];

  displayedColumns: string[] = ['name', 'lastName', 'gender','dob','address','country','Actions'];
  constructor(private apiService: ApiCallsService,private router:Router) {

   }

  ngOnInit(): void {  
    this.ELEMENT_DATA = sessionStorage.getItem('dataArray') ? JSON.parse(sessionStorage.getItem('dataArray')) : [];  
     this.apiService.getRecords().subscribe(item => {      
      this.ELEMENT_DATA = item;
    });    
  }
  deleteRec(id:number){
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter((item) => item.id !== id);
    sessionStorage.clear();
    sessionStorage.setItem('dataArray',JSON.stringify(this.ELEMENT_DATA));
  }
  updateRec(id:number){
    this.router.navigate([`form/${id}`]);
  }

}
