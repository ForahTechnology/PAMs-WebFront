import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ClientObject } from 'src/app/models/auth.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-sampling',
  templateUrl: './sampling.component.html',
  styleUrls: ['./sampling.component.css']
})
export class SamplingComponent implements OnInit {
  allClients: ClientObject[];

  addSearchForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  isLoading: boolean;
  isDownloading: boolean;
  linkType: any;
  allSamples: any;
  index: any;
  pageSize: number = 10;
  pageNumber = 0;
  totalCollection: number;
  searchKeywords: any;
  constructor(private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.getAllClients(1)
        // this.getAllSamples()
        this.linkType = this.activatedRoute.snapshot.params.create;
        this.linkType == 'create' ? null : this.getAllSelectedTest(this.linkType, 1)
      }
    })
  }

  ngOnInit() {
    this.getAllClients(1)
    // this.getAllSamples()
    this.linkType = this.activatedRoute.snapshot.params.create;
    this.linkType == 'create' ? null : this.getAllSelectedTest(this.linkType, 1)
  }

  loadPage(pageNumber) {
    this.getAllSelectedTest(this.linkType, pageNumber)
  }
  
  getAllSelectedTest(sampleName: string, pageNumber: number) {
    this.isLoading = true;
    this.clientService.getAllSelectSamples(sampleName, pageNumber, this.pageSize).subscribe(
      (res) => {
        this.totalCollection = res['returnObject'].total * this.pageSize
        this.allSamples = res['returnObject']['data']
        this.isLoading = false;
      }
    )
  }

  getSearchKeywords() {
    let payload = this.addSearchForm.value.name
    this.allSamples = this.allSamples.filter((client: any) => client.clientName.toLowerCase().includes(payload.toLowerCase()))
    this.addSearchForm.reset()
  }

  downloadPhotos(locationId: string, sampleId: string, _param, _index) {
    this.index = _index;

    this.isDownloading = true;

    this.clientService.downloadTestPhotos(locationId, sampleId, _param).subscribe(
      res => {

        let url = res['returnObject']['fileBase64'];
        this.exportPhotos(url);
        this.isDownloading = false;
        // window.location.href = 'data:image/jpg;base64,' + res['returnObject']['fileBase64'];
      }, (err) => {

        this.isDownloading = false;

      }
    )
  }

  exportPhotos(ImageBase64) {
    let a = document.createElement("a");
    a.href = "data:image/png;base64," + ImageBase64;
    a.download = "photo.jpg";
    a.click();
  }

  exportToExcel(ImageBase64) {
    const link = document.createElement('a');
    link.download = `Report as at ${new Date().toLocaleString()}.xlsx`;
    link.href = 'data:image/png;base64,' + ImageBase64;
    link.click();
  }


  downloadResult(locationId: string, sampleId: string, _param, _index) {
    this.isDownloading = true;
    this.index = _index;


    this.clientService.downloadTestResults(locationId, sampleId, _param).subscribe(
      res => {

        let url = res['returnObject'];
        this.exportToExcel(url);
        this.isDownloading = false;
      }, (err) => {

        this.isDownloading = false;

      }
    )
  }

  getAllClients(pageNumber) {
    this.isLoading = true;
    this.clientService.getAllClients(pageNumber, this.pageSize).subscribe(
      (res) => {
        this.totalCollection = this.pageSize + (res['returnObject'].total * this.pageSize)
        this.allClients = res['returnObject']['data'];
        this.isLoading = false;


      }
    )
  }

  selectSample(event, clientId) {

    this.router.navigate([`/dashboard/sample/create/${clientId}/${event}`])
  }

  getAllSamples() {
    this.isLoading = true;
    this.clientService.getAllSamplings().subscribe(
      (res) => {

        this.allSamples = res['returnObject']

        this.isLoading = false;
      }, (err) => {

        this.isLoading = false;
      }
    )
  }

  getAllSupplies() {
    this.clientService.getAllSupplies().subscribe(
      (res) => {


      }, (err) => {
        console.log(err);

      }

    )
  }


}
