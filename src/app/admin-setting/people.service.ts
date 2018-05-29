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

}
