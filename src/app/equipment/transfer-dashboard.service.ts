import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TransferDashboardService {
  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }
  async setAddDetail(additionId: any) {
    const resp = await this.authHttp.get(`${this.url}/equipment-products/addition-detail/${additionId}`).toPromise();
    return resp.json();
  }
  async getWarehouse() {
    const resp = await this.authHttp.get(`${this.url}/equipment-transfer-dashboard/warehouse`).toPromise();
    return resp.json();
  }

  async getWarehouseEquipment(dstWarehouseId: any) {
    const resp = await this.authHttp.get(`${this.url}/equipment-transfer-dashboard/warehouse/equipment/${dstWarehouseId}`).toPromise();
    return resp.json();
  }

  async getEquipmentDetail(equipmentId: any) {
    const resp = await this.authHttp.get(`${this.url}/equipments/detail/${equipmentId}`).toPromise();
    return resp.json();
  }

  async getDashboardEquipment(equipmentId: any) {
    const resp = await this.authHttp.get(`${this.url}/equipment-transfer-dashboard/dashboard/equipment/${equipmentId}`).toPromise();
    return resp.json();
  }

  async getDashboardWarehouse(warehouseId: any) {
    const resp = await this.authHttp.get(`${this.url}/equipment-transfer-dashboard/dashboard/warehouse/${warehouseId}`).toPromise();
    return resp.json();
  }

  async getDashboardProduct(equipmentId: any) {
    const resp = await this.authHttp.get(`${this.url}/equipment-transfer-dashboard/dashboard/product/${equipmentId}`).toPromise();
    return resp.json();
  }

  async getWaitingList(limit: number = 50, offset: number = 0) {
    const resp = await this.authHttp.post(`${this.url}/equipment-products/addition/list`, {
      limit: limit,
      offset: offset
    }).toPromise();
    return resp.json();
  }
  async gettransection(limit: number = 50, offset: number = 0) {
    const resp = await this.authHttp.post(`${this.url}/equipment-products/transection/list`, {
      limit: limit,
      offset: offset
    }).toPromise();
    return resp.json();
  }
  async exportExcel(id:any) {
    const resp = await this.authHttp.get(`${this.url}/report/addEqui2/${id}`).toPromise();
    return resp.json();
  }

  async gettransectionHistory(limit: number = 10, offset: number = 0) {
    const resp = await this.authHttp.post(`${this.url}/equipment-transfer-dashboard/transection/history`, {
      limit: limit,
      offset: offset
    }).toPromise();
    return resp.json();
  }

  async gettransectionInfo(transectionId: any) {
    const resp = await this.authHttp.get(`${this.url}/equipment-transfer-dashboard/transection/info/${transectionId}`).toPromise();
    return resp.json();
  }

  async gettransectionProduct(transectionId: any, equipmentId: any) {
    const resp = await this.authHttp.get(`${this.url}/equipment-transfer-dashboard/transection/product/${transectionId}/${equipmentId}`).toPromise();
    return resp.json();
  }

  async savetransection(header: any, detail: any[]) {
    const resp = await this.authHttp.post(`${this.url}/equipment-transfer-dashboard`, {
      header: header,
      data: detail
    }).toPromise();
    return resp.json();
  }

  async updatetransection(header: any, detail: any[]) {
    const res = await this.authHttp.put(`${this.url}/equipment-transfer-dashboard`, {
      header: header,
      data: detail
    }).toPromise();
    return res.json();
  }

  async approvetransections(transectionIds: any[]) {
    const res = await this.authHttp.post(`${this.url}/equipment-transfer-dashboard/transection/approve`, {
      transectionIds: transectionIds
    }).toPromise();
    return res.json();
  }

  async canceltransections(transectionId: any) {
    const res = await this.authHttp.post(`${this.url}/equipment-transfer-dashboard/transection/cancel`, {
      transectionId: transectionId
    }).toPromise();
    return res.json();
  }

  async getProductBookingQty(productId: any, lotNo: any, expiredDate: any) {
    const resp = await this.authHttp.post(`${this.url}/equipment-transfer-dashboard`, {
      productId: productId,
      lotNo: lotNo,
      expiredDate: expiredDate
    }).toPromise();
    return resp.json();
  }

}
