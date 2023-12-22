import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formLogin!:FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.formLogin=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    })
  }
  handleLogin() {
    let username=this.formLogin.value.username
    let password =this.formLogin.value.password
    this.authService.login(username,password).subscribe({
      next:data=>{
        console.log(data)
        this.authService.loadProfile(data)
        this.router.navigateByUrl("/admin")
      },
      error:error=>{
        console.log(error);
      }
    })
    }
  

}
