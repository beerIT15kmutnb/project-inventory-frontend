import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class PeopleService {

  constructor(
    private authHttp: AuthHttp,
    @Inject('API_URL') private url: string
  ) { }
  async getUser() {
    const rs: any = await this.authHttp.get(`${this.url}/people/getUser`).toPromise();
    return rs.json();
  }
  async getPeople() {
    const rs: any = await this.authHttp.get(`${this.url}/people/getPeople`).toPromise();
    return rs.json();
  }
  async getTitles() {
    const rs: any = await this.authHttp.get(`${this.url}/people/getTitles`).toPromise();
    return rs.json();
  }
  // async savePeople(item: any) {
  //   console.log(item);
  //   const rs: any = await this.authHttp.post(`${this.url}/people/savePeople`, {
  //     items: item
  //   }).toPromise();
  //   return rs.json();
  // }
  async savePeople(item: any) {
    console.log(item + 1);
    console.log(item);
    const rs: any = await this.authHttp.post(`${this.url}/people/savePeople`, {
      items: item
    }).toPromise();
    return rs.json();
  }
  async saveUser(item: any) {
    console.log(item + 1);
    console.log(item);
    const rs: any = await this.authHttp.post(`${this.url}/people/saveUser`, {
      items: item
    }).toPromise();
    return rs.json();
  }
  
  async editUser(item: any) {
    console.log(item);
    
    const rs: any = await this.authHttp.post(`${this.url}/people/editUser`, {
      items: item
    }).toPromise();
    return rs.json();
  }
  async editPeople(item: any) {
    console.log(item);
    
    const rs: any = await this.authHttp.post(`${this.url}/people/editPeople`, {
      items: item
    }).toPromise();
    return rs.json();
  }
}
