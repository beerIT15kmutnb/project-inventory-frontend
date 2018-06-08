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
  async isActive(id: any, isActive: any) {
    let res = await this.authHttp.put(`${this.url}/issues/isactive`, {
      id: id,
      is_active: isActive
    }).toPromise();
    return res.json();
  }
  async addType(items:any){
    let rs:any =  await this.authHttp.post(`${this.url}/issues/addType`,{
      items:items
    }).toPromise();
    return rs.json();
  }
  async editType(items:any){
    let rs:any =  await this.authHttp.put(`${this.url}/issues/editType`,{
      items:items
    }).toPromise();
    return rs.json();
  }
  async getType() {
    const rs = await this.authHttp.get(`${this.url}/issues/getType`).toPromise();
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

  async gettransectionIssues() {
    const rs = await this.authHttp.get(`${this.url}/issues/gettransectionIssues`).toPromise();
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
