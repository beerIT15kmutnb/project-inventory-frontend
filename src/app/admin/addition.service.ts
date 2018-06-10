import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AdditionService {

  constructor(   @Inject('API_URL') private url: string,
  private authHttp: AuthHttp) { }
  async saveAdditionOrder(order:any,items:any) {
    const resp = await this.authHttp.post(`${this.url}/products/saveAdditionOrder`,{
      order:order,
      items:items
    }).toPromise();
    return resp.json();
  }


}
