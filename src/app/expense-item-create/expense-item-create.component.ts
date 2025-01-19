import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { ExpenseCreate, ExpenseDetail } from '../model/expense';
import { ExpenseService } from '../service/expense.service';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-item-create',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './expense-item-create.component.html',
  styleUrl: './expense-item-create.component.css'
})
export class ExpenseItemCreateComponent implements OnInit {
  formGroup: FormGroup;
  @ViewChild('totalAmt')
  totalAmt !: HTMLInputElement;
  message : string ="";

  constructor(private formBuilder: FormBuilder, private service: ExpenseService, private messageService: MessageService, private router : Router) {
    this.formGroup = formBuilder.group({
      title: formBuilder.control<string>("", Validators.required),
      description: formBuilder.control<string>("", []),
      userName: formBuilder.control<string>("", Validators.required),
      totalAmount: formBuilder.control<string>("", [Validators.required]),
      entryDetails: formBuilder.array([]),
      usedDate: formBuilder.control<Date | null>(null, Validators.required),
      is_completed: formBuilder.control<boolean>(false)
    });
  }

  ngOnInit(): void {
    this.message = this.messageService.currentData;
    setTimeout(()=>{
      this.message = ""
      this.messageService.next("")
    },1000)
  }

  addExpenseItem() {
    let item = this.formBuilder.group(
      {
        title: this.formBuilder.control("", [Validators.required]),
        userName: this.formBuilder.control("", [Validators.required]),
        amount: this.formBuilder.control("", [Validators.required]),
        description: this.formBuilder.control("", [Validators.required])
      });
    (this.formGroup.controls['entryDetails'] as FormArray).push(item);
  }

  get entryDetails() {
    return this.formGroup.controls['entryDetails'] as FormArray
  }

  submit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)

      let data = this.formGroup.value as ExpenseCreate

      let subscription = this.service.create(data).subscribe({
        next: (data: any) => {
          this.messageService.next(data.message);
          this.router.navigateByUrl("/expense/list")
        },
        error: (error) => {
          console.log(error)
        }, complete: () => {
          subscription.unsubscribe();
        }
      });


    }
    console.log(this.formGroup.value)
  }

  disableTotalAmt() {
    this.totalAmt.disabled = true;
  }
}
