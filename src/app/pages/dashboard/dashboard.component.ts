import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser, ClientObject } from 'src/app/models/auth.model';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  authenticatedUser : AuthenticatedUser;
  date;
  hideLeftMenu: boolean = true;
  displaySubMenu: boolean = false;
  currentScreenWidth: number;
  allClients: ClientObject[];
  allInvoice;
  userRole: string;
  subMenuOption: string;
  isDashboard: boolean;
  showDropDown:boolean = false;

  constructor(private clientService : ClientService,
    private dataService: DataService, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'))
    this.date = new Date().toDateString()
    this.router.url.length > 10 ?  this.isDashboard = false : this.isDashboard = true;
  }

  displayLeftMenu() {
    this.hideLeftMenu = !this.hideLeftMenu
    this.displaySubMenu = false;
    this.currentScreenWidth = this.screenWidth

  }

  hideSubMenu(linkType, sampleName?) {
    // this.getAllSelectedTest(sampleName)
    sampleName ? this.showDropDown = !this.showDropDown : null;
    this.displaySubMenu = false;
    this.dataService.sendData(linkType)
    this.isDashboard = false;

  }

  get screenWidth() {
    return screen.width;
  }

  getUserRole() {
    return this.authenticatedUser.role;
  }

  navigateToDashboard() {
    this.router.navigateByUrl('/dashboard')
     this.isDashboard = true;
  }

  getAllSampleTemplate() {
    this.clientService.getAllSamplesTemplate().subscribe((res) => {
    })
  }
  toggleSubMenu(subMenuOptions) {
    this.displaySubMenu = true;
    this.subMenuOption = subMenuOptions
  }



  logout() {
    this.authService.staffSignOut().subscribe(
      (res) => {
        this.router.navigateByUrl('')
      }
    )
  }
}
