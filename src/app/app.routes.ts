import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ExpenseItemCreateComponent } from './expense-item-create/expense-item-create.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseMainComponent } from './expense-main/expense-main.component';
import { authGuard } from './guard/auth.guard';
import { nonAuthGuard } from './guard/non-auth.guard';
import { ExpenseUpdateComponent } from './expense-update/expense-update.component';

export const routes: Routes = [
    {
        path: "auth",
        children: [
            {
                canActivate:[nonAuthGuard],
                path:'login',
                component : LoginComponent
            },
            {
                canActivate:[nonAuthGuard],
                path:'register',
                component : RegisterComponent
            }
        ]
    },
    {
        path: "expense",
        component: ExpenseMainComponent,
        canActivateChild : [authGuard],
        children:[
            { 
                path: "create",
                component: ExpenseItemCreateComponent
            },
            {
                path: "list",
                component: ExpenseListComponent
            },
            {
                path: "update/:id",
                component: ExpenseUpdateComponent
            },
            {
                path:"",
                redirectTo: "expense/list",
                pathMatch:"full"
            }
        ]
    },
    {
        path:"**",
        redirectTo:"expense/list"
    }
    
];
