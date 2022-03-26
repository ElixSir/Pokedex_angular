import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectionService } from './connection.service';


@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(private connectionService: ConnectionService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const requiresLogin = route.data['requiresLogin'] || false;
      if (requiresLogin) {
        if(this.connectionService.isLogged())
        {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      }
      return true;
  }

}
