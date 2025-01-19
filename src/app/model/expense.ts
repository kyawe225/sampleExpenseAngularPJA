import { FormControl } from "@angular/forms"

export interface Expense {
    id?: string,
    title: string,
    description: string,
    userName: string,
    totalAmount: number,
    usedDate: string,
    is_completed: boolean
}


export interface ExpenseDetail {
    title: string,
    userName: string,
    amount: number,
    description: string
}

export interface ExpenseCreate {
    title: string,
    description: string,
    userName: string,
    totalAmount: number,
    usedDate: Date,
    entryDetails: ExpenseDetail[],
    is_completed: boolean
}

export interface ExpenseSarchRequest {
    pageNumber: number,
    pageSize: number,
    SearchCriteria: string // only works on name
    SearchFilter: string
}