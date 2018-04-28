import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IssueService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async updateIssue(issueId: any, summary: any, products: any) {
    const rs = await this.authHttp.put(`${this.url}/issues/${issueId}`, {
      summary: summary,
      products: products
    }).toPromise();
    return rs.json();
  }

  async list(limit: number, offset: number, status: any = '') {
    const rs = await this.authHttp.get(`${this.url}/issues?limit=${limit}&offset=${offset}&status=${status}`).toPromise();
    return rs.json();
  }


}
