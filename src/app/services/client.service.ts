import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  linkType: string;
  selectedSample: any;
  constructor(private http: HttpClient) { }

   getAllClients(pageNumber:number,pageSize:number) {
    return this.http.get(`${environment.baseUrl}/Client/GetAllClient?pageSize=${pageSize}&pageNumber=${pageNumber}`)
  }

  getAllSamplesTemplate() {
    return this.http.get(`${environment.baseUrl}/sample/sampleTemplates?pageSize=10&pageNumber=1`)
  }

  getNesreaTemplate() {
    return this.http.get(`${environment.baseUrl}/Analysis/nesrea-templates`)
  }

  getFmenvTemplate() {
    return this.http.get(`${environment.baseUrl}/Analysis/fmenv-templates`)
  }

  getDprTemplate() {
    return this.http.get(`${environment.baseUrl}/Analysis/dpr-templates`)
  }

  getAllSamplings() {
    return this.http.get(`${environment.baseUrl}/Sample/GetAllSamplings`)
  }

  getAllSupplies() {
    return this.http.get(`${environment.baseUrl}/Inventory/suppliers`)
  }

  submitSamplingData(payload) {
    return this.http.post(`${environment.baseUrl}/Sample/sampling`, payload)
  }

  getAllInvoices() {
    return this.http.get(`${environment.baseUrl}/Invoice/invoices`)
  }

  addClient(payload) {
    return this.http.post(`${environment.baseUrl}/Client/CreateClient`, payload)
  }

  getAllSelectSamples(sampleName: string, pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.baseUrl}/FieldScientistAnalysis${sampleName}/GetAll${sampleName}SubmittedTest?pageSize=${pageSize}&pageNumber=${pageNumber}`)
  }

  getDashboardData() {
    return this.http.get(`${environment.baseUrl}/DashBoard`)
  }

  downloadTestPhotos(locationId:string, sampleId:string, _param) {
    let urlInfo = this.getParamsInfo(_param)
    let params = new HttpParams();
    params = params.append('LocationId', locationId)
    params = params.append(`${urlInfo.name}FieldId`, sampleId);
    return this.http.get(`${environment.baseUrl}/FieldScientistAnalysis${urlInfo.name}/dowload-${urlInfo.url}-test-photo`, {params})
  }

  downloadLabCertificateReport(reportId) {
    console.log('reportId', reportId);

    return this.http.get(`${environment.baseUrl}/Report/downloadreport/${reportId}`)
  }

  createSampleReportCertificate(payload) {
    return this.http.post(`${environment.baseUrl}/Report/create`, payload)
  }

  getAllClientsReports(clientId){ {
    return this.http.get(`${environment.baseUrl}/Report/clientreports/${clientId}`)
  }

  }

  getSingleReportById(sampleId){ {
    return this.http.get(`${environment.baseUrl}/Report/getreportBySampleId/${sampleId}`)
  }}

  downloadTestResults(locationId:string, sampleId:string, _param) {
    let urlInfo = this.getParamsInfo(_param)

    let params = new HttpParams();
    params = params.append('LocationId', locationId)
    params = params.append(`${urlInfo.name}FieldId`, sampleId);
    return this.http.get(`${environment.baseUrl}/FieldScientistAnalysis${urlInfo.name}/dowload-${urlInfo.url}-test-result`, {params})

  }

  getlientLabSamples(clientId:string) {
    return this.http.get(`${environment.baseUrl}/Sample/Samplings/${clientId}`)
  }

  getParamsInfo(_params){
    if(_params == 'DPR') {
      return {
        name: 'DPR',
        url: 'dpr'
      }
    }
    if(_params == "FMEnv (NAAQS)") {
      return {
        name: 'FMEnv',
        url: 'fmenv'
      }
    }

    if(_params == "NESREA") {
      return {
        name: 'Nesrea',
        url: 'nesrea'
      }
    }
  }

  addNewClientLocation(payload){
    return this.http.post(`${environment.baseUrl}/FieldScientistAnalysisNesrea/add-client-location`, payload)
  }

  getAllClientLocations(clientId) {
    return this.http.get(`${environment.baseUrl}/FieldScientistAnalysisNesrea/get-all-Sample-locations-for-a-Client?clientId=${clientId.clientId}`)
  }


}
