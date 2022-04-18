import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'))
     const url = request.url.startsWith(environment.baseUrl);
     if(authenticatedUser && url) {
       request = request.clone({
         setHeaders: { Authorization: `Bearer ${authenticatedUser['token']}` }
       })
     }
     return next.handle(request);
   }
}
