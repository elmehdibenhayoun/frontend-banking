import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {



  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObserveble!: Observable<AccountDetails>
  operationFormGroup!: FormGroup;
  errorMessage!: string;


  constructor(private fb: FormBuilder, private accountService: AccountService,public authService:AuthService) { }
  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control("")
    });
    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)
    });
  }
  handleSearchAccount() {
    let accountId = this.accountFormGroup.value.accountId;
    this.accountObserveble = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }
  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }
  handleAccountOperation() {
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount: number = this.operationFormGroup.value.amount;
    let description: string = this.operationFormGroup.value.description;
    let accountDestination: string = this.operationFormGroup.value.accountDestination;
    if (operationType == 'DEBIT') {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: (data) => {
          alert("Success Debit")
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (error) => {
          console.log(error);

        }
      })
    } else if (operationType == 'CREDIT') {
      this.accountService.credit(accountId, amount, description).subscribe({
        next: (data) => {
          alert("Success CREDIT")
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (error) => {
          console.log(error);
        }
      })

    } else if (operationType == 'TRANSFER') {
      this.accountService.transfer(accountId, accountDestination, amount).subscribe({
        next: (data) => {
          alert("Success TRANSFER")
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (error) => {
          console.log(error);
        }
      });

    }

  }

}
