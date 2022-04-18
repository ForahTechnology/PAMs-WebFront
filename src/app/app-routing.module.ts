import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetListComponent } from './pages/dashboard/assets/asset-list/asset-list.component';
import { AssetsComponent } from './pages/dashboard/assets/assets.component';
import { CustomerMgtComponent } from './pages/dashboard/customer-mgt/customer-mgt.component';
import { DashboardContentComponent } from './pages/dashboard/dashboard-content/dashboard-content.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InvoiceComponent } from './pages/dashboard/invoice/invoice.component';
import { LabSamplesComponent } from './pages/dashboard/lab-samples/lab-samples.component';
import { NewSampleComponent } from './pages/dashboard/new-sample/new-sample.component';
import { SamplingComponent } from './pages/dashboard/sampling/sampling.component';
import { UserMgtComponent } from './pages/dashboard/user-mgt/user-mgt.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuardService as AuthGuard} from './services/auth-guard.service';


const routes: Routes = [
  {
    path: '', component: SignupComponent
  },
  {
    path:'reset-password', component: PasswordResetComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,
    // canActivate: [AuthGuard],
    children:[
      {path:'', redirectTo: 'dashboard', pathMatch:'full'},
      {path:'', component:DashboardContentComponent},
      {path:'customer', component:CustomerMgtComponent},
      {path:'invoice', component:InvoiceComponent},
      {path:'users', component:UserMgtComponent},
      {path:'sample/:create', component:SamplingComponent},
      {path:'sample/:all', component:SamplingComponent},
      {path:'labSamples', component:LabSamplesComponent},
      {path:'sample/:create/:clientId/:type', component:NewSampleComponent},
      {path:'assets-management', component:AssetsComponent},
      {path:'assets-management/:new_equipment', component:AssetsComponent},
      {path:'assets-management/items/:all', component:AssetListComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
