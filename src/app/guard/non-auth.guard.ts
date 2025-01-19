import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const nonAuthGuard: CanActivateFn = (route, state) => {
    let authService = inject(AuthService);
    let router = inject(Router);
    let auth= authService.isAuthenticated.getValue();
  
    if(auth){
      router.navigateByUrl("/expense/login");
    }
    return !auth;
};
