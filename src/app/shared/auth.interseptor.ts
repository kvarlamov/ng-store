import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {error} from 'util';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class AuthInterseptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.Token
        }
      });
    }

    return next.handle(req)
      .pipe(
        catchError( er => {
          if (er.status === 401) {
            this.auth.logout();
            this.router.navigate(['/admin', 'login']);
          }
          return throwError(er);
        })
      );
  }

}
