import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  staffRegistration(payload) {
    return this.http.post(`${environment.baseUrl}/Account/SignUp`, payload)
  }

  staffSignIn(payload) {
    return this.http.post(`${environment.baseUrl}/account/signIn`, payload)
  }

  staffSignOut() {
    return this.http.post(`${environment.baseUrl}/account/signOut`, null)
  }

  resetPassword(payload) {
    return this.http.post(`${environment.baseUrl}/Account/ForgotPassword/${payload.email}`, null)
  }

  submitResetPassword(payload) {
    return this.http.post(`${environment.baseUrl}/Account/ResetPassword`, payload)
  }

}
