import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class GenericsService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }
  async getType(){
    let rs:any =  await this.authHttp.get(`${this.url}/generics/getGenericType`).toPromise();
    return rs.json();
  }
  async addType(items:any){
    let rs:any =  await this.authHttp.put(`${this.url}/generics/addType`,{
      items:items
    }).toPromise();
    return rs.json();
  }
  async editType(items:any){
    let rs:any =  await this.authHttp.put(`${this.url}/generics/editType`,{
      items:items
    }).toPromise();
    return rs.json();
  }
  async isActive(id: any, isActive: any) {
    let res = await this.authHttp.put(`${this.url}/issues/isactive`, {
      id: id,
      is_active: isActive
    }).toPromise();
    return res.json();
  }
}
