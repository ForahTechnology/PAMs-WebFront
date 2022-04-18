import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientObject } from 'src/app/models/auth.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-lab-samples',
  templateUrl: './lab-samples.component.html',
  styleUrls: ['./lab-samples.component.css']
})
export class LabSamplesComponent implements OnInit {
  isLoading: boolean;
  pageSize: number = 10;
  allClients: ClientObject[];
  totalCollection: number;
  pageNumber = 0;
  allSamples: any;
  switchTab: boolean;
  isLabSamples: boolean = false;
  index: number;
  clientId: string;
  isdownloading: boolean;
  downloadIndex: any;
  sampleReportId: any;
  isCreatingReport: boolean;
  @ViewChild('downloadReportCertificate', {static:false}) downloadReportCertificate : ElementRef
  viewIndex: any;
  report: any;
  searchKeywords: any;
  allClientsCopy: any;
  constructor(private clientService: ClientService, private fb: FormBuilder, private modalService: NgbModal, private toastr : ToastrService) { }

  createCertificateForm: FormGroup = this.fb.group({
    lab_Sample_Ref_Number: ['',  ],
    certificate_Number: ['',  ],
    sample_Label: ['',  ],
    date_Recieved_In_Lab: ['', Validators.required],
    date_Analysed_In_Lab: ['', Validators.required],
    sample_Type: ['', ],
    batch_Number: ['', ],
    temperature: ['', ],
    humidity: ['', ],
    lab_Analyst: ['', ],
    comment: ['', ],
  });
  ngOnInit() {
    this.getAllClients(1)
  }

  getAllClients(pageNumber) {
    this.isLoading = true;

    this.clientService.getAllClients(pageNumber, this.pageSize).subscribe(
      (res) => {
        this.totalCollection = this.pageSize + (res['returnObject'].total * this.pageSize)
        this.allClients = res['returnObject']['data'];
        this.allClientsCopy = res['returnObject']['data'];
        this.isLoading = false;
        this.isLabSamples = false;

      }
    )
  }

  getSearchKeywords() {
    console.log(this.searchKeywords, 'searchKeywords');

    this.allClients =  this.searchKeywords.length ? this.allClients.filter((client:any) => client.name.toLowerCase().includes(this.searchKeywords.toLowerCase()) && this.searchKeywords.length) : this.allClientsCopy;
  }

  // getAllClientSearch(event) {
  //   this.allClients = event;
  // }

  getSamplesForCient(clientID:string, index:number) {
    this.index = index;
    this.clientId = clientID;
    this.clientService.getlientLabSamples(clientID).subscribe((res) => {
      this.index = null;
      this.isLabSamples = true;
      this.allSamples = res['returnObject'];
      console.log('res', res);
    }, err => {
      this.index = null;
      this.isLabSamples =  false;
      console.log(err)}

    )
  }

  createSampleReportCertificate() {
    this.isCreatingReport = true;
    console.log('this.sampleReportId,', this.sampleReportId,);

      console.log(this.createCertificateForm.value);
      let payload = {
        clientID: this.clientId,
        samplingID: this.sampleReportId,
        lab_Env_Con: {
          humidity: this.createCertificateForm.value.humidity,
          temperature: this.createCertificateForm.value.temperature
        },
        lab_Sample_Ref_Number : this.createCertificateForm.value.lab_Sample_Ref_Number,
        certificate_Number : this.createCertificateForm.value.certificate_Number,
        sample_Label : this.createCertificateForm.value.sample_Label,
        date_Recieved_In_Lab : this.createCertificateForm.value.date_Recieved_In_Lab,
        date_Analysed_In_Lab : this.createCertificateForm.value.date_Analysed_In_Lab,
        sample_Type : this.createCertificateForm.value.sample_Type,
        batch_Number : this.createCertificateForm.value.batch_Number,
        lab_Analyst : this.createCertificateForm.value.lab_Analyst,
        comment : this.createCertificateForm.value.comment,
      }
    this.clientService.createSampleReportCertificate(payload).subscribe(
      res => {
        this.modalService.dismissAll()
        this.toastr.success('Report created!')
      }, err => {
        console.log(err, 'err');
        this.toastr.error(err.error.message)
      }
    )
  }

  openModal(content, id) {
    this.sampleReportId = id;
    this.modalService.open(content)
  }
  getSingleReportById(sampleId, index) {
    this.viewIndex = index;
    this.clientService.getSingleReportById(sampleId).subscribe(
      (res) => {
        this.viewIndex = null;
        this.modalService.open(this.downloadReportCertificate)
        this.report = res['returnObject']
        console.log(res, 'all report');
      }, err => {
        console.log(err, 'err');

      }
    )
  }

  downloadReport(reportId, index?) {
    this.downloadIndex = true;
    // this.sampleReportId = reportId
    this.isdownloading = true;
    this.clientService.downloadLabCertificateReport(reportId).subscribe(
      (res:Blob) => {
        this.downloadIndex = false;
        console.log(res, 'report');

        var file = new Blob([res], { type: 'application/pdf' })
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          var a         = document.createElement('a');
          a.href        = fileURL;
          a.target      = '_blank';
          a.download    = 'bill.pdf';
          document.body.appendChild(a);
          a.click();

      }, err => {
        // err.status == 404 ? this.modalService.open(this.reportCertificate) : this.toastr.error('An error occured, please try again');
        console.log(err, 'Repoer');
        this.isdownloading = false;
        this.downloadIndex = false;
      }
    )
  }
}
