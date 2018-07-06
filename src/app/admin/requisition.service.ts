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
    // tslint:disable-next-line:max-line-length
    const rs: any = await this.authHttp.get(`${this.url}/requisition/orders/waiting?limit=${limit}&offset=${offset}&query=${query}&fillterCancel=${fillterCancel}`)
      .toPromise();
    return rs.json();
  }
  async getApproved(limit: number, offset: number, query = '') {
    const rs: any = await this.authHttp.get(`${this.url}/requisition/orders/approved?limit=${limit}&offset=${offset}&query=${query}`)
      .toPromise();
    return rs.json();
  }
  async saveRequisitionOrder(order: any, products: any) {
    const rs: any = await this.authHttp.put(`${this.url}/requisition/orders/saveRequisitionOrder`, {
      order: order,
      products: products
    }).toPromise();
    return rs.json();
  }
  async approveRequisitionOrder(id: any, products: any) {
    const rs: any = await this.authHttp.put(`${this.url}/requisition/orders/approveRequisitionOrder/${id}`, {
      products: products
    }).toPromise();
    return rs.json();
  }
  async updateRequisitionOrder(id: any, order: any, products: any) {
    const rs: any = await this.authHttp.put(`${this.url}/requisition/orders/updateRequisitionOrder/${id}`, {
      order: order,
      products: products
    }).toPromise();
    return rs.json();
  }
  async setReqs(requisitionId: any) {
    const rs: any = await this.authHttp.get(`${this.url}/requisition/orders/setReqs/${requisitionId}`).toPromise();
    return rs.json();
  }
  async setReqsDetail(requisitionId: any) {
    const rs: any = await this.authHttp.get(`${this.url}/requisition/orders/setReqsDetail/${requisitionId}`).toPromise();
    return rs.json();
  }
  async setReqsProductDetail(id: any) {
    const rs: any = await this.authHttp.get(`${this.url}/requisition/orders/setReqsProductDetail/${id}`).toPromise();
    return rs.json();
  }
  async removeRequisitionOrder(Id) {
    const res = await this.authHttp.delete(`${this.url}/requisition/remove?requisitionId=${Id}`).toPromise();
    return res.json();
  }
}
