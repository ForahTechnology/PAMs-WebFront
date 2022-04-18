import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  productForm: FormGroup
  isChecked:boolean = true;
  isLoading: boolean = false;
  selectedTab: any = 'newEquipment';
  allEquipementOrdered;
  singleEquipmentOrder;
  allStockOrdered;
  otherInventoryForm: FormGroup;
  locations = [{name:'Physcio_Chemical_Lab', value: 0}, {name:'Microbiology_Lab', value:1}]
  orderId: any;
  isGettingSingleOrder = false;
  singleStockOrder: any;
  isDeleting: boolean;
  isLoadingOrders: boolean;
  activeRoute: any;

  constructor(private fb: FormBuilder, private orderService: OrderService,
    private toastr: ToastrService, private modalService: NgbModal, private activateRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.intiProductForm()
    this.intiotherInventoryForm()
    this.getEquipmentOrder()
    // this.getStockOrder()
    this.activeRoute = this.activateRoute.snapshot.params.new_equipment;

  }

  intiProductForm() {
    this.productForm = this.fb.group({
      equipmentName: [''],
      description: [''],
      idTag: [''],
      location: [''],
      supplier: [''],
      purchaseDate: ['', Validators.required],
      warrantyExpiration: ['', Validators.required],
      price: [''],
      condition: [''],
      unitPrice: [''],
      quantity: [''],
      modelNumber: [''],
      serialNumber: [''],
      photoLink: [''],
      discountinued: [false],
    })
  }

  intiotherInventoryForm() {
    this.otherInventoryForm = this.fb.group({
      itemName: [null],
      itemNumber: [null],
      dateOfLastOrder: [null],
      quantity: [null],
      location: [null],
      expiryDate: [null],
      weight: [null],
      unitCost: [null],
      stockQty: [null],
      totalValue: [null],
      reorderLevel: [null],
      quantityUsed: [null],
      quantityLeft: [null],
      itemDiscontinued: [false],
    })
  }

  submitProductDetails() {
    let payload = this.productForm.value
    this.isLoading = true
    this.orderService.submitProductOrder(payload).subscribe(
      (res) => {
        this.productForm.reset()
        this.toastr.success('product add successfuly')
        this.isLoading =  false
      },
      (err) => {
        this.isLoading =  false
        this.toastr.error('an error occured, please try again.')
      }
    )
  }

    submitOtherProductDetails() {
    let payload = this.otherInventoryForm.value
    this.isLoading = true
    this.orderService.submitOtherItemsOrder(payload).subscribe(
      (res) => {
        this.otherInventoryForm.reset()
        this.toastr.success('product add successfuly')
        this.isLoading =  false
      },
      (err) => {
        this.isLoading =  false
        this.toastr.error('an error occured, please try again.')
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

  openModal(modalRef, orderId?) {
    this.orderId = orderId
    this.modalService.open(modalRef, { centered: true })
  }






  // getSingleStockOrder(orderId, modalName) {
  //   this.isGettingSingleOrder = true;
  //   this.modalService.open(modalName, { centered: true })
  //   this.orderService.getSingleStockHistory(orderId).subscribe(
  //     (res) => {

  //       this.singleStockOrder = res['returnObject']
  //       this.isGettingSingleOrder = false;
  //     }, (err) => {
  //       this.toastr.error(err)
  //       this.isGettingSingleOrder = false;

  //     }
  //   )
  // }

  // deleteSingleStockOrder() {
  //   this.isDeleting = true;
  //   this.orderService.deleteSingleStockHistory(this.orderId).subscribe(
  //     (res) => {
  //       this.toastr.success('Deleted Successfully')
  //       this.modalService.dismissAll()
  //       this.isDeleting = false;
  //       this.getStockOrder()
  //     }, (err) => {
  //       this.toastr.error('An error occured. Please tri again.')
  //       this.isDeleting = false;

  //     }
  //   )
  // }

  toggleChecked() {
    this.isChecked = !this.isChecked
  }

  switchTab(selectedTab) {
    this.selectedTab = selectedTab
  }

}
