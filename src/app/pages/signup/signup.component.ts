import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationReq } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registration: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    activationCode: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.min(11)]),
  });


  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  passwordRestForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
  });


  notValue: boolean;
  isSignin: boolean = true;
  isLoading: boolean;
  resetPassword: boolean;
  resetMessage:string = '';
  message: any = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.resetPassword = false;
  }

  confirmPassword() {
    (this.registration.get(['password']).value != this.registration.get(['confirmPassword']).value
     && this.registration.get(['confirmPassword']).value != null) ? this.notValue = true : this.notValue = false
  }

  completeRegistraion() {
    this.isLoading = true;
    let form_data = new FormData();
    // let payload: RegistrationReq = {
      form_data.append('phoneNumber', this.registration.value.phoneNumber)
      form_data.append('activationCode', this.registration.value.activationCode)
      form_data.append('password', this.registration.value.password)
      form_data.append('email', this.registration.value.email)
      form_data.append('lastName', this.registration.value.lastName)
      form_data.append('firstName', this.registration.value.firstName)

     let payload: RegistrationReq = {
        phoneNumber : this.registration.value.phoneNumber,
      activationCode : this.registration.value.activationCode,
      password: this.registration.value.password,
      email: this.registration.value.email,
      lastName: this.registration.value.lastName,
      firstName: this.registration.value.firstName

    }
    // form_data.append()

    // let form_data = this.convertJSONToFormdata(payload);

    this.authService.staffRegistration(form_data)
    .subscribe(
      (res) => {
        this.toastr.success(res['message'])
        this.isSignin = true;
        this.isLoading = false;
      }, (err) => {
        this.message = err.error.message;
        this.toastr.error(err.error.message)
        this.isLoading = false;
      }
    )
  }

  private convertJSONToFormdata(payload: RegistrationReq) {
    let form_data = new FormData();
    Object.keys(payload).forEach(key => {
      form_data.append(JSON.stringify(key), JSON.stringify(payload[key]));

    });

    return form_data;
  }

  signin(){
    this.isLoading = true;
    let payload = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    }
    this.authService.staffSignIn(payload).subscribe(
      (res) => {
        localStorage.setItem('authenticatedUser', JSON.stringify(res['returnObject']))
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard')
      }, (err) => {

        this.toastr.error(err.error.message)
        this.isLoading = false;
      }
    )
  }

   submitResetPassword(){
    this.isLoading = true;
    let payload = {
      email: this.passwordRestForm.value.email,
    }
    this.authService.resetPassword(payload).subscribe(
      (res) => {
        this.isLoading = false;
        this.resetMessage = res['message']
      }, (err) => {

        this.toastr.error(err.error.message)
        this.isLoading = false;
      }
    )
  }

}
