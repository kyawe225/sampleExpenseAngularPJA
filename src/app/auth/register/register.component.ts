import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MessageService } from '../../service/message.service';
import { Register } from '../../model/auth';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  message: string ="";
  constructor(formBuilder : FormBuilder,private router : Router,private service : AuthService,private messageService : MessageService){
    this.formGroup = formBuilder.group({
      name: formBuilder.control("",[Validators.required]),
      email : formBuilder.control("",[Validators.required, Validators.email]),
      password : formBuilder.control("",[Validators.required])
    })
  }

  goLoginRoute(){
    this.router.navigateByUrl("/auth/login");
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
      password: this.formGroup.controls['password'].value,
      name: this.formGroup.controls['name'].value
    } as Register;

    let subscription = this.service.login(model).subscribe({
      next: (value: any) => {
        this.messageService.next(value.data)

        this.router.navigateByUrl("/auth/login");
      },
      error: (err)=>{
        console.log(err)
        this.message = "Register Error"
      }
    });
    
  }
}
