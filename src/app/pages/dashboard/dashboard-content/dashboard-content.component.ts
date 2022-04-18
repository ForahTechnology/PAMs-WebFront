import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticatedUser } from 'src/app/models/auth.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {
  authenticatedUser : AuthenticatedUser;
  isDashboard: boolean;
  labData;
  constructor(private clientService : ClientService,) { }
  currentScreenWidth: number;
  firstName:string;
  fieldData;
  dashBoardMatrics;
  dataLabels = ['Five Days Ago', 'Four Days Ago', 'Six Days Ago', 'Three Days Ago', 'Today', 'Two Days Ago', 'YesterDay']
  chartColors: Array<any> = [
    {
      backgroundColor: ['rgba(114, 1, 101, 0.6)']
    }
  ]

  ngOnInit() {
    this.authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'))
    this.currentScreenWidth = this.screenWidth
    this.getFirstName();
    this.getChartDetails();


  }

  getFirstName() {
    this.firstName = this.authenticatedUser.fullname.split(' ')[0]
  }

  get screenWidth() {
    return screen.width;
  }

  getChartDetails() {
   return this.clientService.getDashboardData().subscribe(
    (res) => {

      this.constructionFieldDataStructure(res);
      this.constructionLabDataStructure(res)
      this.dashBoardMatrics =  res['returnObject'];
    }
    )
  }

  constructionFieldDataStructure(analysisData) {
    let data = [];
    Object.values( analysisData.returnObject.fieldAnalysis).forEach(value => data.push(value));
    this.fieldData = [
      {
        data,
        label: "Field Analyses"
      }
    ]
  }


  constructionLabDataStructure(analysisData) {
    let data = [];
    Object.values( analysisData.returnObject.labAnalysis).forEach(value => data.push(value));
    this.labData = [
      {
        data,
        label: "Lab Analyses"
      }
    ]
  }

}


