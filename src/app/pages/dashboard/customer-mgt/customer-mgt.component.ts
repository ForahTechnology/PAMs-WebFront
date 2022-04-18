import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClientObject, SampleTemplatesObject } from 'src/app/models/auth.model';
import { ClientService } from 'src/app/services/client.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-mgt',
  templateUrl: './customer-mgt.component.html',
  styleUrls: ['./customer-mgt.component.css', '../dashboard.component.css']
})
export class CustomerMgtComponent implements OnInit {

  addNewClientForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    sampleTemplates: new FormControl('', Validators.required),
  });

  templateSamples = [
        {templateId: '2172604c-c6f5-4012-d5bc-08d9aa113da0', type: 0, name: 'NESREA',  },
        {templateId: '1d4bc849-105f-4a63-95f5-08d9aec92248', type: 1, name: 'FMEnv (BREWERY)' },
        {templateId: 'abe7253d-c42c-48ba-95f4-08d9aec92248', type: 1, name: 'FMEnv (AGRICULTURAL)' },
        {templateId: 'e8150061-82cc-41c7-95f3-08d9aec92248', type: 1, name: 'FMEnv (BEVERAGES)' },
        {templateId: '1e140409-57da-4caf-1efc-08d9aa0fbb4b', type: 2, name: 'DPR' },
    ]
  allClients: ClientObject[];
  linkType: string;
  sampleTemplates: SampleTemplatesObject[] = []
  private onDestroy$ = new Subject();
  isLoading: boolean;
  isAddingLocation: boolean;
  newLocationForm: FormGroup;
  clientId: any;
  pageNumber: any;
  // page:number = 1;
  pageSize:number = 10;
  totalCollection: number;

  constructor(private clientService : ClientService, private fb: FormBuilder,
    private toastr: ToastrService, private modalService: NgbModal,
    private dataService : DataService) { }

  ngOnInit() {
    this.pageNumber = 0;
    this.getLinkType()
    this.getAllClients(1)
    this.getAllClientLocation("cd1ca8fa-d851-440d-6cbd-08d9aa141efc")
    // this.linkType ? this.linkType : this.linkType = 'add';
  }

  submitNewClientData(){
    this.isLoading = true;
    let {address, email, name} = this.addNewClientForm.value
    let payload = {
      address, email, name,
      sampleTemplates : this.sampleTemplates
    }
    this.clientService.addClient(payload).subscribe((res) => {
      this.addNewClientForm.reset()
      this.isLoading = false;
    }, err => {
      this.toastr.error(err.error.message)
      this.isLoading = false;

    })
  }
  getLinkType() {
    this.linkType = 'add'
     this.dataService.dataType$.pipe(takeUntil(this.onDestroy$)).subscribe( res => {
      this.linkType = res;
    })
  }

  getAllClients(pageNumber) {
    console.log(pageNumber, 'pageNumber');

    // this.pageNumber++
    this.clientService.getAllClients(pageNumber, this.pageSize).subscribe(
      (res) => {
        this.totalCollection = this.pageSize + (res['returnObject'].total * this.pageSize)
        this.allClients = res['returnObject']['data'];


      }
    )
  }

  selectTemplate(event) {

    if(event.type == 0) {
      this.sampleTemplates.push({
      templateId: "2172604c-c6f5-4012-d5bc-08d9aa113da0",
      type: 0})
    }
    if(event.type == 1) {

      if(event.name.includes('BEVERAGES') ){
        this.sampleTemplates.push({
        templateId: "e8150061-82cc-41c7-95f3-08d9aec92248",
        type: 1 })
      }

      if(event.name.includes('AGRICULTURAL') ){
        this.sampleTemplates.push({
        templateId: "abe7253d-c42c-48ba-95f4-08d9aec92248",
        type: 1 })
      }

      if(event.name.includes('BREWERY') ){
        this.sampleTemplates.push({
        templateId: "1d4bc849-105f-4a63-95f5-08d9aec92248",
        type: 1 })
      }
    }

    if(event.type == 2) {
      this.sampleTemplates.push({
      templateId: "1e140409-57da-4caf-1efc-08d9aa0fbb4b",
      type: 2 })
    }

  }

  openModal(modalRef, clientId:string) {
    this.clientId = clientId;
    this.modalService.open(modalRef, { centered: true, size:'sm' })
    this.initAddressForm()
  }

  initAddressForm() {
    this.newLocationForm = this.fb.group({
      address: ['', Validators.required],
      description: ['']
    })
  }

  submitLocatoinDetails() {
    this.isAddingLocation = true;
    let payload = {
      name:  this.newLocationForm.value.address,
      description:  this.newLocationForm.value.description,
      clientId: this.clientId
    }

    this.clientService.addNewClientLocation(payload).subscribe(
      (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.isAddingLocation = false;
        this.toastr.success("Location Added!")
      }, (err) => {
        console.log(err);
        this.isAddingLocation = false;
      }
    )

  }

  getAllClientLocation(clientId) {
    let payload = {
      clientId
    }
    this.clientService.getAllClientLocations(payload).subscribe(
      (res) => {
        console.log(res, 'res');
      }, (err) => {
        console.log(err, 'err');

      }
    )
  }

}


