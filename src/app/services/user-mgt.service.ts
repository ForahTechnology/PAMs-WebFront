import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserMgtService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${environment.baseUrl}/Management/getUsers`)
  }

  sendUserRegistrationCode(payload) {
    return this.http.post(`${environment.baseUrl}/Account/GenerateActivationCode/${payload.email}`, '')
  }

  promoteUser(userId, roleId) {
    return this.http.put(`${environment.baseUrl}/Management/changeUserRole/${userId}/${roleId}`, '')
  }

  getAvailableRole() {
    return this.http.get(`${environment.baseUrl}/Management/getUserTypes`)
  }

  deactivateUser(userId) {
    return this.http.patch(`${environment.baseUrl}/Management/disableUser/${userId}`, '')
  }

  activateUser(userId) {
    return this.http.patch(`${environment.baseUrl}/Management/enableUser/${userId}`, '')
  }

}
