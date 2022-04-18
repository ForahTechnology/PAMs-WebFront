import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticatedUser } from 'src/app/models/auth.model';
import { ClientService } from 'src/app/services/client.service';
import { UserMgtService } from 'src/app/services/user-mgt.service';

@Component({
  selector: 'app-user-mgt',
  templateUrl: './user-mgt.component.html',
  styleUrls: ['./user-mgt.component.css', '../dashboard.component.css']
})
export class UserMgtComponent implements OnInit {

  addNewUserForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
  });
  authenticatedUser: AuthenticatedUser;
  allUsers: any;
  isProcessing: boolean = false;
  isLoading: boolean = false;
  actionType: any = '';
  userId: any ='';

  constructor(private clientService : ClientService,
    private userService : UserMgtService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'))
    this.getAllUsers()
    this.getAllRoleTypes()

  }

  submitNewUserData(){
    this.isProcessing = true
    let payload = this.addNewUserForm.value
    this.userService.sendUserRegistrationCode(payload).subscribe(res => {
      this.addNewUserForm.reset()
      this.toastr.success(res['message'])
      this.isProcessing = false;
    }, (err) => {
      this.isProcessing = false;
      // this.toastr.error('hiiii')
      this.toastr.error(err['error']['message'])
    })
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe( (res) => {
      this.allUsers = res['returnObject'];
    }, (err) => {
      this.toastr.success(err['error']['message'])
    })
  }

  getAllRoleTypes() {
    this.userService.getAvailableRole().subscribe((res) => {


    })
  }

  changeStaffRole(userId, roleId, actionType?) {
    this.actionType = actionType
    this.userId = userId;
    this.userService.promoteUser(userId, roleId).subscribe((res) => {

      this.toastr.success(res['message'])
      this.isLoading = false;
      this.actionType = ''
    }, (err) => {
      this.toastr.error(err['error']['message'])
      this.isLoading = false;
      this.actionType = ''
    })
  }

  deactivateUser(userId) {
    this.isLoading = true;
    this.userId = userId;
    this.userService.deactivateUser(userId).subscribe((res) => {
      this.toastr.success(res['message'])
      this.isLoading = false;
      this.getAllUsers()

    }, (err) => {
      this.toastr.error(err.error.message)
      this.isLoading = false;
    })
  }

  activateUser(userId) {
    this.userId = userId;
    this.isLoading = true;
    this.userService.activateUser(userId).subscribe((res) => {
      this.toastr.success(res['message'])
      this.getAllUsers();
      this.isLoading = false;
    }, (err) => {
      this.toastr.error(err.error.message)
      this.isLoading = false;
    })
  }



}
