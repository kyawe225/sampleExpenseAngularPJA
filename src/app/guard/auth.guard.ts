import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let auth= authService.isAuthenticated.getValue();

  if(!auth){
    router.navigateByUrl("/auth/login");
    console.log("no auth")
    return false;
  }
  console.log("auth")
  return true;
};
