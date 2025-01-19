import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../service/expense.service';
import { MessageService } from '../service/message.service';
import { ExpenseCreate } from '../model/expense';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-expense-update',
  imports: [ReactiveFormsModule, NgbDatepickerModule, NgbAlertModule, FormsModule],
  templateUrl: './expense-update.component.html',
  styleUrl: './expense-update.component.css'
})
export class ExpenseUpdateComponent implements OnInit {
  formGroup: FormGroup;
  @ViewChild('totalAmt')
  totalAmt !: ElementRef;
  id: string = "";
  message: string = "";

  constructor(private router: Router,private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private service: ExpenseService, private messageService: MessageService) {
    this.formGroup = formBuilder.group({
      title: formBuilder.control<string>("", Validators.required),
      description: formBuilder.control<string>("", []),
      userName: formBuilder.control<string>("", Validators.required),
      totalAmount: formBuilder.control<string>("", [Validators.required]),
      entryDetails: formBuilder.array([], Validators.required),
      usedDate: formBuilder.control<string>("", Validators.required),
      is_completed: formBuilder.control<boolean>(false)
    });
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadExpenseDetail()
  }

  private loadExpenseDetail() {
    let sub = this.service.getDetail(this.id).subscribe({
      next: (value) => {
        console.log(value)
        let temp = value as any;
        this.formGroup.patchValue(temp.data)
        console.log(temp.data.usedDate)
        var tempDate = new Date(temp.data.usedDate)
        console.log(this.formGroup.controls['usedDate']);
        (<FormControl>this.formGroup.controls['usedDate']).setValue({ day: tempDate.getDay(), month: tempDate.getMonth() + 1, year: tempDate.getFullYear() });
        temp.data.entryDetails.map((p: any) => this.addOldExpenseItem(p));
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        sub.unsubscribe();
      }
    });
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
    console.log(this.totalAmt);
  }

  addOldExpenseItem(i: any) {
    console.log("adding item")
    console.log(i)
    let item = this.formBuilder.group(
      {
        id: this.formBuilder.control(""),
        title: this.formBuilder.control("", [Validators.required]),
        userName: this.formBuilder.control("", [Validators.required]),
        amount: this.formBuilder.control<number>(0, [Validators.required]),
        description: this.formBuilder.control("", [Validators.required])
      });
    item.patchValue(i);
    (this.formGroup.controls['entryDetails'] as FormArray).push(item);
  }

  get entryDetails() {
    return this.formGroup.controls['entryDetails'] as FormArray
  }

  submit() {
    if (this.formGroup.valid) {
      this.totalAmt.nativeElement.disabled = false;
      console.log(this.formGroup.value)

      let data = this.formGroup.value as ExpenseCreate

      let usedDate= (<FormControl>this.formGroup.controls['usedDate']).value;

      data.usedDate = new Date(usedDate.year,usedDate.month-1,usedDate.day)

      let subscription = this.service.update(this.id, data).subscribe({
        next: (data: any) => {
          this.messageService.next(data.message);
          this.router.navigateByUrl("/express/list");
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

  updateTotal() {
    let total = 0;
    console.log(this.entryDetails.value)
    if (Array.isArray(this.entryDetails.value)) {
      this.entryDetails.value.map((p: { amount: string; }) => total += (isNaN(Number(p.amount))) ? 0 : Number(p.amount))
    } else {
      let tempArr = [this.entryDetails.value];
      tempArr.map((p: { amount: string; }) => total += (isNaN(Number(p.amount))) ? 0 : Number(p.amount))
    }
    (<FormControl>this.formGroup.controls['totalAmount']).setValue(total);
    this.totalAmt.nativeElement.disabled = true;
  }
}
