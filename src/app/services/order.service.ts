import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

   submitProductOrder(payload) {
    return this.http.post(`${environment.baseUrl}/Inventory/equipment`, payload)
  }

  submitOtherItemsOrder(payload) {
    return this.http.post(`${environment.baseUrl}/Inventory/stock`, payload)
  }

  getEquipmentHistory() {
    return this.http.get(`${environment.baseUrl}/Inventory/equipment/all`)
  }

  getSigleEquipmentHistory(orderId) {
    return this.http.get(`${environment.baseUrl}/Inventory/equipment/${orderId}`)
  }

   deleteSigleEquipmentHistory(orderId) {
    return this.http.delete(`${environment.baseUrl}/Inventory/equipment/${orderId}`)
  }

  getStockHistory() {
    return this.http.get(`${environment.baseUrl}/Inventory/stock/all`)
  }

  getSingleStockHistory(orderId) {
    return this.http.get(`${environment.baseUrl}/Inventory/stock/${orderId}`)
  }

  deleteSingleStockHistory(orderId) {
    return this.http.delete(`${environment.baseUrl}/Inventory/stock/${orderId}`)
  }
}
