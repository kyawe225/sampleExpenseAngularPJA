import { Component, OnInit } from '@angular/core';
import { Expense, ExpenseSarchRequest } from '../model/expense';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from '../service/message.service';
import { ExpenseService } from '../service/expense.service';
import { ModelDeleteComponent } from '../shared/model-delete/model-delete.component';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  imports: [
    FormsModule,
    NgbPaginationModule
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
  total = 0;
  private paginatedObj : ExpenseSarchRequest = {
    pageNumber: 1,
    pageSize: 10,
    SearchCriteria: "",
    SearchFilter: ""
  } 
  page = 1;
  

  constructor(private router: Router, private service : ExpenseService, private messageService: MessageService, private modalService : NgbModal) {

  }

  pageChange(event : number){
    this.paginatedObj.pageNumber = event;
    this.getExpenseList();
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

  search(){
    this.paginatedObj.SearchCriteria = this.searchCritea;
    this.paginatedObj.SearchFilter = this.searchBox;
    this.getExpenseList();
  }

  private getExpenseList(){
    this.service.getPaginated(this.paginatedObj).subscribe({
      next : (value :any)=>{
        this.items = value.data;
        this.total = value.total;
        this.page = value.page;
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
