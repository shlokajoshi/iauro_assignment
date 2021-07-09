import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { ApiCallsService } from '../services/api-calls.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  autoCompleteControl = new FormControl();
  filteredOptions: any;
  options: string[] = ['One', 'Two', 'Three'];
  isUpdate: boolean = false;
  DataArray: any = [];
  updateObj: any;

  constructor(
    private apiService: ApiCallsService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.DataArray = sessionStorage.getItem('dataArray') ? JSON.parse(sessionStorage.getItem('dataArray')) : [];
  }


  formDetails = this.fb.group({
    id: [Math.floor(Math.random() * 100)],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dob: ['', Validators.required],
    address: ['', Validators.required],
    country: this.autoCompleteControl,
  });
  ngOnInit(): void {
    this.filteredOptions = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.options.filter(option => option.toLowerCase().includes(value))
        ));
        this.activatedRoute.params.subscribe((item) => {
          if (item.id !== null && item.id !== undefined && this.DataArray.length > 0
          ) {
            this.isUpdate = true;
            this.DataArray.forEach((element: any) => {
              if (element.id == item.id) {
                this.updateObj = element;
                this.formDetails.get('id')?.patchValue(element.id);
                this.formDetails.get('firstName')?.patchValue(element.firstName);
                this.formDetails.get('lastName')?.patchValue(element.lastName);
                this.formDetails.get('gender')?.patchValue(element.gender);
                this.formDetails.get('dob')?.patchValue(element.dob);
                this.formDetails.get('address')?.patchValue(element.address);
                this.formDetails.get('country')?.patchValue(element.country);
              }
            });
          }
        });
  }

  submit() {
    if (this.formDetails.valid) {
      if (!this.isUpdate) {
        this.DataArray.push(this.formDetails.value);
        sessionStorage.setItem('dataArray', JSON.stringify(this.DataArray));
        this._snackBar.open("Student Added", "Ok");
        this.router.navigate(['view']);
      } else {
        this.DataArray = this.updateRec();
        this._snackBar.open("Student Updated", "Ok");
        sessionStorage.clear();
        sessionStorage.setItem('dataArray', JSON.stringify(this.DataArray));
        this.router.navigate(['view']);
      }
      this.apiService.setRecords(this.DataArray);

    }
  }

  updateRec() {
    return this.DataArray.map((item: any) => {
      if (this.updateObj.id == item.id) {
        return this.formDetails.value;
      }
      return item;
    });
  }
}
