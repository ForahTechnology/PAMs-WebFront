import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css','../dashboard.component.css']
})
export class InvoiceComponent implements OnInit {
  allInvoice;
  constructor(private clientService : ClientService) { }

  ngOnInit() {
    this.getAllInvoices()
  }


  getAllInvoices() {
    this.clientService.getAllInvoices().subscribe(res => {

      this.allInvoice = res['returnObject'];
    })
  }

}
