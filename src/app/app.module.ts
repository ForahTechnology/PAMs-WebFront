import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloaderComponent } from './pages/preloader/preloader.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { JwtInterceptor } from './services/jwt.interceptor';
import { InvoiceComponent } from './pages/dashboard/invoice/invoice.component';
import { CustomerMgtComponent } from './pages/dashboard/customer-mgt/customer-mgt.component';
import { UserMgtComponent } from './pages/dashboard/user-mgt/user-mgt.component';
import { DashboardContentComponent } from './pages/dashboard/dashboard-content/dashboard-content.component';
import { AssetsComponent } from './pages/dashboard/assets/assets.component';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SamplingComponent } from './pages/dashboard/sampling/sampling.component';
import { NewSampleComponent } from './pages/dashboard/new-sample/new-sample.component';
import { AssetListComponent } from './pages/dashboard/assets/asset-list/asset-list.component';
import * as echarts from 'echarts';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { LabSamplesComponent } from './pages/dashboard/lab-samples/lab-samples.component';
// import { SearchBarComponent } from './pages/dashboard/search-bar/search-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PreloaderComponent,
    DashboardComponent,
    InvoiceComponent,
    CustomerMgtComponent,
    UserMgtComponent,
    DashboardContentComponent,
    AssetsComponent,
    SamplingComponent,
    NewSampleComponent,
    AssetListComponent,
    PasswordResetComponent,
    LabSamplesComponent,
    // SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    ChartsModule
  ],
  providers: [AuthService, ThemeService,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
