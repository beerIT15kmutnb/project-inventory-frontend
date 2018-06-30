import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequisitionService {

  constructor(
    private authHttp: AuthHttp,
    @Inject('API_URL') private url: string
  ) { }
  async getWating(limit: number, offset: number, query = '', fillterCancel = 'all') {
    const rs: any = await this.authHttp.get(`${this.url}/equipment-requisition/orders/waiting?limit=${limit}&offset=${offset}&query=${query}&fillterCancel=${fillterCancel}`)
      .toPromise();
    return rs.json();
  }
  async getApproved(limit: number, offset: number, query = '') {
    const rs: any = await this.authHttp.get(`${this.url}/equipment-requisition/orders/approved?limit=${limit}&offset=${offset}&query=${query}`)
      .toPromise();
    return rs.json();
  }
  async saveRequisitionOrder(order: any, products: any) {
    const rs: any = await this.authHttp.put(`${this.url}/equipment-requisition/orders/saveRequisitionOrder`, {
      order: order,
      products: products
    }).toPromise();
    return rs.json();
  }
  async approveRequisitionOrder(id: any, products: any) {
    const rs: any = await this.authHttp.put(`${this.url}/equipment-requisition/orders/approveRequisitionOrder/${id}`, {
      products: products
    }).toPromise();
    return rs.json();
  }
  async updateRequisitionOrder(id: any, order: any, products: any) {
    const rs: any = await this.authHttp.put(`${this.url}/equipment-requisition/orders/updateRequisitionOrder/${id}`, {
      order: order,
      products: products
    }).toPromise();
    return rs.json();
  }
  async setReqs(requisitionId: any) {
    const rs: any = await this.authHttp.get(`${this.url}/equipment-requisition/orders/setReqs/${requisitionId}`).toPromise();
    return rs.json();
  }
  async setReqsDetail(requisitionId: any) {
    const rs: any = await this.authHttp.get(`${this.url}/equipment-requisition/orders/setReqsDetail/${requisitionId}`).toPromise();
    return rs.json();
  }
  async setReqsProductDetail(id: any) {
    const rs: any = await this.authHttp.get(`${this.url}/equipment-requisition/orders/setReqsProductDetail/${id}`).toPromise();
    return rs.json();
  }
  
  async removeRequisitionOrder(Id) {
    const res = await this.authHttp.delete(`${this.url}/equipment-requisition/remove?requisitionId=${Id}`).toPromise();
    return res.json();
  }
}
