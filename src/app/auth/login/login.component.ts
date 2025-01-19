import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MessageService } from '../../service/message.service';
import { Login } from "../../model/auth";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  message : string ="";

  constructor(formBuilder: FormBuilder, private router: Router, private service: AuthService, private messageService : MessageService) {
    this.formGroup = formBuilder.group({
      email: formBuilder.control("", [Validators.required, Validators.email]),
      password: formBuilder.control("", Validators.required)
    });
  }

  ngOnInit(): void {
    this.message = this.messageService.currentData;
    setTimeout(()=>{
      this.message = ""
      this.messageService.next("")
    },1000)
  }

  submit(){
    let model = {
      email: this.formGroup.controls['email'].value,
      password: this.formGroup.controls['password'].value
    } as Login;

    let subscription = this.service.login(model).subscribe({
      next: (value: any) => {
        let data = value.data;
        let token = data.token;
        let expireAt = data.expireAt;
        this.service.updateToken(token,data.userName)
        this.service.updateExpireTime(expireAt)

        this.router.navigateByUrl("/expense/list");
      },
      error: (err)=>{
        console.log(err)
        this.message = "Login Error"
      }
    });
   
  }
}
