import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  isGettingSingleOrder: boolean;
  singleEquipmentOrder: any;
  isLoadingOrders;
  activeRoute: any;
  allEquipementOrdered: any;
  orderId: any;
  isDeleting: boolean;
  allStockOrdered: any;
  singleStockOrder: any;
  selectedTab = 'Equipment'
  label: any = 'Equipment';
  constructor(private orderService: OrderService,
    private toastr: ToastrService, private modalService: NgbModal, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getEquipmentOrder()
    this.getStockOrder()
    this.activeRoute = this.activateRoute.snapshot.params.new_equipment;
  }


  getSignleEquipmentOrder(orderId, modalName) {
    this.isGettingSingleOrder = true;
    this.modalService.open(modalName, { centered: true });
    this.orderService.getSigleEquipmentHistory(orderId).subscribe(
      (res) => {

        this.singleEquipmentOrder = res['returnObject']
        this.isGettingSingleOrder = false;
      }, (err) => {
        this.isGettingSingleOrder = false;
        this.toastr.error(err)
      }
      )
    }

  getEquipmentOrder() {
    this.isLoadingOrders = true;
    this.orderService.getEquipmentHistory().subscribe(
      (res) => {
        this.allEquipementOrdered = res['returnObject']
         this.isLoadingOrders = false;
      }, (err) => {
        this.toastr.error('Failed to load orders. Please try again.')
         this.isLoadingOrders = false;
      }
    )
  }

  switchTab(selectedTab:string) {
      this.label = selectedTab;
    this.selectedTab = selectedTab
  }

   openModal(modalRef, orderId?) {
    this.orderId = orderId
    this.modalService.open(modalRef, { centered: true })
  }

    equipmentOrderDelete() {
    this.isDeleting = true;
    this.orderService.deleteSigleEquipmentHistory(this.orderId).subscribe(
      (res) => {
        this.toastr.success('Deleted Successfully')
        this.modalService.dismissAll()
        this.isDeleting = false;
        this.getEquipmentOrder()
      }, (err) => {
        this.toastr.error('An error occured. Please try again.')
        this.isDeleting = false;
      }
    )
  }

   getSingleStockOrder(orderId, modalName) {
    this.isGettingSingleOrder = true;
    this.modalService.open(modalName, { centered: true })
    this.orderService.getSingleStockHistory(orderId).subscribe(
      (res) => {

        this.singleStockOrder = res['returnObject']
        this.isGettingSingleOrder = false;
      }, (err) => {
        this.toastr.error(err)
        this.isGettingSingleOrder = false;

      }
    )
  }

    deleteSingleStockOrder() {
    this.isDeleting = true;
    this.orderService.deleteSingleStockHistory(this.orderId).subscribe(
      (res) => {
        this.toastr.success('Deleted Successfully')
        this.modalService.dismissAll()
        this.isDeleting = false;
        this.getStockOrder()
      }, (err) => {
        this.toastr.error('An error occured. Please tri again.')
        this.isDeleting = false;

      }
    )
  }

   getStockOrder() {
     this.isLoadingOrders = true;
     this.orderService.getStockHistory().subscribe(
       (res) => {
         this.allStockOrdered = res['returnObject']
         this.isLoadingOrders = false;
        },(err) => {
          this.isLoadingOrders = false;
          this.toastr.error('failed to load orders. please try again')

      }
    )
  }
}
