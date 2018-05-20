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
    const rs = await this.authHttp.put(`${this.url}/issues/update/${issueId}`, {
      summary: summary,
      products: products
    }).toPromise();
    return rs.json();
  }

  async list(limit: number, offset: number, status: any = '') {
    const rs = await this.authHttp.get(`${this.url}/issues?limit=${limit}&offset=${offset}&status=${status}`).toPromise();
    return rs.json();
  }
  async listDetail(id:any) {
    const rs = await this.authHttp.get(`${this.url}/issues/listDetail?id=${id}`).toPromise();
    return rs.json();
  }

  async getTransactionIssues() {
    const rs = await this.authHttp.get(`${this.url}/issues/getTransactionIssues`).toPromise();
    return rs.json();
  }
  async approveIssue(issueId:any){
    const rs = await this.authHttp.post(`${this.url}/issues/approveIssue`,{
      issueId: issueId
    }).toPromise();
    return rs.json();
  }
  async setIssueDetail(issueId:any){   
    const rs = await this.authHttp.get(`${this.url}/issues/setIssueDetail/`+issueId).toPromise();
    return rs.json();
  }
  async setIssueProductDetail(issuePId:any){   
    const rs = await this.authHttp.get(`${this.url}/issues/setIssueProductDetail/`+issuePId).toPromise();
    return rs.json();
  }
  async setIssues(issueId:any){   
    const rs = await this.authHttp.get(`${this.url}/issues/setIssues/`+issueId).toPromise();
    return rs.json();
  }
  async saveIssue(summary: any, products: any) {
    const rs = await this.authHttp.put(`${this.url}/issues/saveIssue`,{
      summary:summary,
      products:products
    }).toPromise();
    return rs.json();
  }
  

}
