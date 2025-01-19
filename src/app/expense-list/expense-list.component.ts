import { Component, OnInit } from '@angular/core';
import { Expense } from '../model/expense';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from '../service/message.service';
import { ExpenseService } from '../service/expense.service';
import { ModelDeleteComponent } from '../shared/model-delete/model-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  imports: [
    FormsModule
  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {
  items: Expense[] = [];
  message: string = "";
  searchCritea = "";
  searchBox = "";
  success = false;

  constructor(private router: Router, private service : ExpenseService, private messageService: MessageService, private modalService : NgbModal) {

  }

  ngOnInit() {
    this.getExpenseList();
    this.showMessage(this.messageService.currentData,true)
  }

  private showMessage(message:string,success : boolean = false){
    this.message = this.messageService.currentData;
    this.success = success;
    setTimeout(() => {
      this.message = ""
      this.messageService.next("")
      this.success = false
    }, 1000)
  }

  private getExpenseList(){
    this.service.getAll().subscribe({
      next : (value :any)=>{
        this.items = value.data;
      },
      error: (err)=>{
        console.error(err)
      }
    })
  }

  showAsDateTime(s : string){
    return new Date(s);
  }

  deleteConfirmation(Id : string){
    this.modalService.open(ModelDeleteComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log("closed")
        if (result) {
          this.deleteExpense(Id);
          this.getExpenseList();
        }
      },
      (reason) => {
        console.log("dismissed")
      },
    );
  }

  private deleteExpense(Id : string){
    this.service.delete(Id).subscribe({
      next: (data : any)=>
      {
        this.getExpenseList();
        this.showMessage(data.message,true)
      },
      error: (err)=>{
        console.error(err)
        this.showMessage(err,false)
      }
    })
  }
}
