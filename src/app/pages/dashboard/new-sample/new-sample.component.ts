import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-new-sample',
  templateUrl: './new-sample.component.html',
  styleUrls: ['./new-sample.component.css']
})
export class NewSampleComponent implements OnInit {
  routeParams: any;
  authenticatedUser: any;
  selectSample = ''
  isSubmitting: boolean;
  FMENvTemplatesArray: any;
  selectedIndex: any;

  constructor(private toastr: ToastrService, private router: Router, private clientService : ClientService, private activatedRoute : ActivatedRoute) { }
  selectedTemplate;
  isLoading;
  input;
  page = 7;
  // microbiaFormControlNames = []
  microbialParametersFormGroup: FormGroup = new FormGroup({});
  physicoParametersFormGroup: FormGroup = new FormGroup({});
  ngOnInit() {
    // this.getFmenvTemplates()
    this.isLoading = true;
    this.routeParams = this.activatedRoute.snapshot.params
    this.selectSample = this.routeParams.type

    this.selectSample == 'NESREA' ? this.getNesreaTemplate() : (this.selectSample == 'DPR' ? this.getDprTemplates() : this.getFmenvTemplates())
    this.authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'))
  }

  getNesreaTemplate() {
    this.clientService.getNesreaTemplate().subscribe(
      (res) => {

        this.selectedTemplate = res['returnObject']['analysis'][0]
        this.createmicrobialParametersFormControlNames(this.selectedTemplate)
        this.createphysicoParametersFormControlNames(this.selectedTemplate)
        this.isLoading = false;
      }, (err) => {
        this.isLoading = false;
      }
    )
  }

  getDprTemplates() {
    this.clientService.getDprTemplate().subscribe(
      (res) => {
        this.selectedTemplate = res['returnObject']['analysis'][0];
        this.createmicrobialParametersFormControlNames(this.selectedTemplate)
        this.createphysicoParametersFormControlNames(this.selectedTemplate)
        this.isLoading = false;
      }, (err) => {

        this.isLoading = false;
      }
    )
  }

  getFmenvTemplates() {
    this.clientService.getFmenvTemplate().subscribe(
      (res) => {
        console.log('res', res);
        this.FMENvTemplatesArray = res['returnObject']['analysis'];
        this.selectedTemplate = this.FMENvTemplatesArray[0]
        this.selectedIndex = 0;
        this.createmicrobialParametersFormControlNames(this.selectedTemplate)
        this.createphysicoParametersFormControlNames(this.selectedTemplate)
        this.isLoading = false;
      }, (err) => {

        this.isLoading = false;
      }
    )
  }

  toggleFmenvOptions(index) {
    this.isLoading = true;
    this.selectedIndex = index;
    this.selectedTemplate = this.FMENvTemplatesArray[index];
    this.createmicrobialParametersFormControlNames(this.selectedTemplate)
    this.createphysicoParametersFormControlNames(this.selectedTemplate)
    this.isLoading = false;
  }

  createmicrobialParametersFormControlNames(template) {
    template.microbialParameters.forEach(element => {
      this.microbialParametersFormGroup.addControl(element.microbial_Group, new FormControl(''))
    });
  }

  createphysicoParametersFormControlNames(template) {
    template.physicoParameters.forEach(element => {
      this.physicoParametersFormGroup.addControl(element.parameter, new FormControl(''))
    });
  }

  addTodo() {
    this.isSubmitting = true;
   let payload = this.prepareSamplePayload();
    this.clientService.submitSamplingData(payload).subscribe(
      (res) => {
        this.toastr.success(res['message'])
        this.isSubmitting = false;
        this.router.navigateByUrl('/sample/create')
      }, (err) => {
        this.isSubmitting = false;
        this.toastr.error('An error Occoured.')
      }
    )
  }

  preparmicrobialParametersData() {
    let microBiologicals = []
    this.selectedTemplate.microbialParameters.map((element) => {
      microBiologicals.push({
        microbial_Group: element.microbial_Group,
        unit: element.unit,
        limit: element.limit,
        test_Method: element.test_Method,
        result: this.microbialParametersFormGroup.value[element.microbial_Group]
      })
    })
    return microBiologicals
  }

  preparPhysicoParametersData() {
    let physicoParameters = []
    this.selectedTemplate.physicoParameters.map((element) => {
      physicoParameters.push({
        test_Performed_And_Unit: element.test_Performed_And_Unit,
        uc: element.uc,
        limit: element.limit,
        test_Method: element.test_Method,
        result: this.physicoParametersFormGroup.value[element.parameter],
        type: 0,
      })
    })
    return physicoParameters
  }

  getSamplingTime() {
    let currentDate = new Date();
    let hour =  currentDate.getHours();
    let min = currentDate.getMinutes();
    let sec = currentDate.getSeconds();
    let currentTime = `${hour}:${min}:${sec}`
    return currentTime;

  }

  prepareSamplePayload() {
    let payload = {
      staffName: this.authenticatedUser.fullname,
      staffId: this.authenticatedUser.userId,
      samplingTime: this.getSamplingTime(),
      samplingDate: new Date(),
      clientId: this.routeParams.clientId,
      gpsLong: 0,
      gpsLat: 0,
      picture: "",
      microBiologicals: this.preparmicrobialParametersData(),
      physicoChemicals: this.preparPhysicoParametersData()
    }
    return payload;
  }

  removeSample(index, controlName) {
    this.selectedTemplate.microbialParameters.splice(index, 1)
    this.microbialParametersFormGroup.removeControl(controlName)
  }

  removePhysicoSample(index, controlName) {
    this.selectedTemplate.physicoParameters.splice(index, 1)
    this.physicoParametersFormGroup.removeControl(controlName)
  }

}
