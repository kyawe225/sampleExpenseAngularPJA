import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-expense-main',
  imports: [
    RouterOutlet,
    NgbDropdownModule
  ],
  templateUrl: './expense-main.component.html',
  styleUrl: './expense-main.component.css'
})
export class ExpenseMainComponent {
  name =signal<string>("");
  constructor(private service : AuthService){
    this.name.set(service.name)
  }

  logout(){
    this.service.logout();
  }
}
