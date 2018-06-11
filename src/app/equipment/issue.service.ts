import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IssueService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async updateIssue(issueIds: any, summary: any, products: any) {
    const rs = await this.authHttp.put(`${this.url}/equipment-issues/update/${issueIds}`, {
      summary: summary,
      products: products
    }).toPromise();
    return rs.json();
  }
  async isActive(id: any, isActive: any) {
    let res = await this.authHttp.put(`${this.url}/equipment-issues/isactive`, {
      id: id,
      is_active: isActive
    }).toPromise();
    return res.json();
  }
  async addType(items:any){
    let rs:any =  await this.authHttp.post(`${this.url}/equipment-issues/addType`,{
      items:items
    }).toPromise();
    return rs.json();
  }
  async editType(items:any){
    let rs:any =  await this.authHttp.put(`${this.url}/equipment-issues/editType`,{
      items:items
    }).toPromise();
    return rs.json();
  }
  async getType() {
    const rs = await this.authHttp.get(`${this.url}/equipment-issues/getType`).toPromise();
    return rs.json();
  }
  
  async removeIssue(issueIds) {
    const res = await this.authHttp.delete(`${this.url}/equipment-issues/remove?issues=${issueIds}`).toPromise();
    return res.json();
  }
  async list(limit: number, offset: number, status: any = '') {
    const rs = await this.authHttp.get(`${this.url}/equipment-issues?limit=${limit}&offset=${offset}&status=${status}`).toPromise();
    return rs.json();
  }
  async listDetail(id:any) {
    const rs = await this.authHttp.get(`${this.url}/equipment-issues/listDetail?id=${id}`).toPromise();
    return rs.json();
  }

  async gettransectionIssues() {
    const rs = await this.authHttp.get(`${this.url}/equipment-issues/gettransectionIssues`).toPromise();
    return rs.json();
  }
  async approveIssue(issueIds:any){
    const rs = await this.authHttp.post(`${this.url}/equipment-issues/approveIssue`,{
      issueIds: issueIds
    }).toPromise();
    return rs.json();
  }
  async setIssueDetail(issueIds:any){   
    const rs = await this.authHttp.get(`${this.url}/equipment-issues/setIssueDetail/`+issueIds).toPromise();
    return rs.json();
  }
  async setIssueProductDetail(equipmentPId:any){   
    const rs = await this.authHttp.get(`${this.url}/equipment-issues/setIssueProductDetail/`+equipmentPId).toPromise();
    return rs.json();
  }
  async setIssues(issueIds:any){   
    const rs = await this.authHttp.get(`${this.url}/equipment-issues/setIssues/`+issueIds).toPromise();
    return rs.json();
  }
  async saveIssue(summary: any, products: any) {
    const rs = await this.authHttp.put(`${this.url}/equipment-issues/saveIssue`,{
      summary:summary,
      products:products
    }).toPromise();
    return rs.json();
  }
  

}
