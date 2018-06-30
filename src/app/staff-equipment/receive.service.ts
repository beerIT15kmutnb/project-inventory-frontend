import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReceiveService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }
  ////////////////////////////////////


  async saveReceive(summary: any, products: Array<any>) {
    const res = await this.authHttp.post(`${this.url}/equipment-receives`, {
      summary: summary,
      products: products
    }).toPromise();
    console.log(res.json());
     
    return res.json();
  }

  async getReceiveInfo(receiveId: any) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/info?receiveId=${receiveId}`)
      .toPromise();
    return res.json();
  }
  async getReceiveProducts(receiveId) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/products?receiveId=${receiveId}`)
      .toPromise();
    return res.json();
  }
  ////////////////////////////////////






  getAllProducts() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/equipment-receives/all-products`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }
  // get conversion

  async getLots(productId: any) {
    const response = await this.authHttp.post(`${this.url}/equipment-receives/get-lots`, {
      productId: productId
    })
      .toPromise();
    return response.json();
  }

  getReceiveTypes() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/equipment-receives/types`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getStatusStatus() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/equipment-receives/status`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  searchProduct(query: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/equipment-receives/search`, {
        query: query
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getProductPackages(productId: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/equipment-receives/product-packages`, {
        productId: productId
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getLocation(warehouseId: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/equipment-receives/locations/${warehouseId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getWarehouse() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/equipment-receives/warehouse-main`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  async getCommittePO(id: any) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/po/${id}`).toPromise();
    return res.json();
  }
  



  async getReceiveOtherDetail(receiveOtherId: any) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/other/detail/${receiveOtherId}`).toPromise();
    return res.json();
  }

  async getReceiveOtherDetailProductList(receiveOtherId: any) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/other/detail/product-list/${receiveOtherId}`).toPromise();
    return res.json();
  }

  async removeReceiveOther(receiveOtherId: any) {
    const rs = await this.authHttp.delete(`${this.url}/equipment-receives/other/${receiveOtherId}`).toPromise();
    return rs.json();
  }

  async doApproveOtherAll(receiveOtherIds: any[], approveDate: any, comment: any) {
    const res = await this.authHttp.post(`${this.url}/equipment-receives/other/approve/all`, {
      receiveOtherIds: receiveOtherIds,
      approveDate: approveDate,
      comment: comment
    }).toPromise();
    return res.json();
  }

  async updateReceive(receiveId: any, summary: any, products: Array<any>) {
    const res = await this.authHttp.put(`${this.url}/equipment-receives/${receiveId}`, {
      summary: summary,
      products: products
    }).toPromise();

    return res.json();
  }

  async updatePurchaseCompleted(purchaseOrderId: any) {
    const res = await this.authHttp.put(`${this.url}/equipment-receives/purchase/completed`, {
      purchaseOrderId: purchaseOrderId
    }).toPromise();

    return res.json();
  }



  async getProductReceives() {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/product-receives`).toPromise();
    return res.json();
  }

  async updateReceiveCommittee(receiveId: any, committeeId: any) {
    const res = await this.authHttp.put(`${this.url}/equipment-receives/committee/${committeeId}`, {
      receiveId: receiveId
    }).toPromise();
    return res.json();
  }

  async getCommittee() {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/committee`).toPromise();
    return res.json();
  }

  async getCommitteeList(committeeId: any) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/committee/${committeeId}`).toPromise();
    return res.json();
  }


  async saveApprove(receiveIds: any[]) {
    const res = await this.authHttp.post(`${this.url}/equipment-receives/approve`, {
      receiveIds: receiveIds
    }).toPromise();
    return res.json();
  }

  async saveApproveOther(receiveIds: any[], approveDate: any, comment: any) {
    const res = await this.authHttp.post(`${this.url}/equipment-receives/other/approve`, {
      receiveIds: receiveIds,
      approveDate: approveDate,
      comment: comment
    }).toPromise();
    return res.json();
  }



  async getPeople() {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/people/list`)
      .toPromise();
    return res.json();
  }



  async getReceiveOtherProducts(receiveOtherId) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/other/product-list/${receiveOtherId}`)
      .toPromise();
    return res.json();
  }

  async removeReceive(receiveId) {
    const res = await this.authHttp.delete(`${this.url}/equipment-receives/remove?receiveId=${receiveId}`).toPromise();
    return res.json();
  }

  // =================== receive with purchases =================
  async getPurchasesList(limit: number = 100, offset: number = 0) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/purchases/list?limit=${limit}&offset=${offset}`)
      .toPromise();

    return res.json();
  }

  async getPurchasesListSearch(limit: number = 100, offset: number = 0, query: any) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/purchases/list/search?limit=${limit}&offset=${offset}&query=${query}`)
      .toPromise();

    return res.json();
  }

  async getPurchaseProductsList(purchaseOrderId: any) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/purchases/product-list?purchaseOrderId=${purchaseOrderId}`)
      .toPromise();
    return res.json();
  }

  async getPurchaseCheckHoliday(date) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/purchases/check-holiday?date=${date}`)
      .toPromise();
    return res.json();
  }

  async getPurchaseCheckExpire(equipmentId: any, expiredDate: any) {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/purchases/check-expire?equipmentId=${equipmentId}&expiredDate=${expiredDate}`)
      .toPromise();
    return res.json();
  }
  // =============== document service ===============

  async checkApprove(username: any, password: any, action: any) {
    const rs: any = await this.authHttp.post(`${this.url}/equipment-issues/checkApprove`, {
      username: username,
      password: password,
      action: action
    }).toPromise();
    return rs.json();
  }
  async saveCost(products: any) {
    const rs: any = await this.authHttp.put(`${this.url}/equipment-receives/update/cost`, {
      products: products
    }).toPromise();
    return rs.json();
  }
  async getApprove() {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/count/approve`)
      .toPromise();
    return res.json();
  }
  async getApproveOther() {
    const res = await this.authHttp.get(`${this.url}/equipment-receives/count/approve/other`)
      .toPromise();
    return res.json();
  }

  async getReceiveOtherStatusSearch(limit: number = 15, offset: number = 0, query, status) {
    const res = await this.authHttp.post(`${this.url}/equipment-receives/other/status/search`, {
      limit: limit,
      offset: offset,
      status: status,
      query: query
    }).toPromise();
    return res.json();
  }
  async getReceiveOtherStatus(limit: number = 15, offset: number = 0, status) {
    const res = await this.authHttp.post(`${this.url}/equipment-receives/other/status`, {
      limit: limit,
      offset: offset,
      status: status
    }).toPromise();
    return res.json();
  }
  //use
  async getReceiveStatus(limit: number = 15, offset: number = 0,status:string = '') {
    const res = await this.authHttp.post(`${this.url}/equipment-receives/status`, {
      limit: limit,
      offset: offset,
      status:status
    }).toPromise();
    return res.json();
  }
  async getReceiveStatusSearch(limit: number = 15, offset: number = 0, query) {
    const res = await this.authHttp.post(`${this.url}/equipment-receives/status/search`, {
      limit: limit,
      offset: offset,
      query: query
    }).toPromise();
    return res.json();
  }
}
