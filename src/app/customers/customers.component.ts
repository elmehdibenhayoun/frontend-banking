import { Customer } from './../model/customer.model';
import { CustomerService } from './../services/customer.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number=5
  customers$!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup!: FormGroup | undefined;
  constructor(private authService:AuthService,private customerService: CustomerService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control("")
    });
    this.handleSearchcustomers();

  }
  handleSearchcustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers$ = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }
  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchcustomers();
  }
  handleDeleteCustomer(c: Customer) {
    let conf=confirm("are you sure?");
    if(!conf)return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (resp) => {
        this.customers$ = this.customers$.pipe(
          map(data => {
            let index = data.indexOf(c);
            data.slice(index, 1)
            return data;
          }))
      },
      error: err => {
        console.log(err);
      }
    });
  }
  handleEditCustomer() {
    throw new Error('Method not implemented.');
  }
  handleCustomerAccount(customer: Customer) {
    this.router.navigateByUrl("/admin/customer-accounts/"+customer.id,{state:customer});
    }
}
