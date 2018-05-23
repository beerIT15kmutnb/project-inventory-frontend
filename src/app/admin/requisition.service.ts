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
    const rs: any = await this.authHttp.get(`${this.url}/requisition/orders/waiting?limit=${limit}&offset=${offset}&query=${query}&fillterCancel=${fillterCancel}`)
      .toPromise();
    return rs.json();
  }
  async saveRequisitionOrder(order: any, products: any) {
    const rs: any = await this.authHttp.post(`${this.url}/requisition/orders/saveRequisitionOrder`, {
      order: order,
      products: products
    }).toPromise();
    return rs.json();
  }

}
