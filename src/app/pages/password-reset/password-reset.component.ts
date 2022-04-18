import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  isLoading:boolean;
  isvalid: boolean = true;
  token: any;
  email: any;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

   changePasswordRestForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  ngOnInit() {
    let quaryParams = this.activeRoute.snapshot.queryParams;
    this.token = quaryParams.resetToken;
    this.email = quaryParams.email;

  }

  isPasswordValid() {

    if(this.changePasswordRestForm.value.password == this.changePasswordRestForm.value.confirmPassword ) {
      this.isvalid =  true;
    }else {
      this.isvalid =  false;
    }
  }

  submitChangePassword(){
    this.isLoading = true;
    let payload = {
      email: this.changePasswordRestForm.value.email,
      password: this.changePasswordRestForm.value.password,
      token: this.token
    }


    this.authService.submitResetPassword(payload).subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigateByUrl('')
      }, (err) => {
        this.toastr.error(err.error.message)
        this.isLoading = false;
      }
    )
  }

}
