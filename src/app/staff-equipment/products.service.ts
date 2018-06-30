import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { query } from '@angular/animations';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async getProductPackage(id: any) {
    const rs = await this.authHttp.get(`${this.url}/equipment-products/getProductPackage/${id}`).toPromise();
    return rs.json();
  }
  async getUnit() {
    const rs = await this.authHttp.get(`${this.url}/equipment-products/getUnit`).toPromise();
    return rs.json();
  }
  async isActiveProduct(id: any, isActive: any) {
    const res = await this.authHttp.put(`${this.url}/equipment-products/is-active-product`, {
      id: id,
      is_active: isActive
    }).toPromise();
    return res.json();
  }
  async isActiveEquipment(id: any, isActive: any) {
    const res = await this.authHttp.put(`${this.url}/equipment-products/is-active-equipment`, {
      id: id,
      is_active: isActive
    }).toPromise();
    return res.json();
  }
  async isActive(id: any, isActive: any) {
    const res = await this.authHttp.put(`${this.url}/equipment-issues/isactive`, {
      id: id,
      is_active: isActive
    }).toPromise();
    return res.json();
  }
  async saveAddProduct(items: any) {
    const rs = await this.authHttp.put(`${this.url}/equipment-products/saveAddProduct`, {
      items: items
    }).toPromise();
    return rs.json();
  } async saveEditProduct(items: any) {
    const rs = await this.authHttp.put(`${this.url}/equipment-products/saveEditProduct`, {
      items: items
    }).toPromise();
    return rs.json();
  }
  async saveAddEquipments(items: any) {
    const rs = await this.authHttp.put(`${this.url}/equipment-products/saveAddEquipments`, {
      items: items
    }).toPromise();
    return rs.json();
  } async saveEditEquipments(items: any) {
    const rs = await this.authHttp.put(`${this.url}/equipment-products/saveEditEquipments`, {
      items: items
    }).toPromise();
    return rs.json();
  }
  async allProducts(querys: any, limit: number = 10, offset: number = 0) {
    const resp = await this.authHttp.post(`${this.url}/equipment-products/stock/products/all`, {
      limit: limit,
      offset: offset,
      query: querys
    }).toPromise();
    return resp.json();
  }
  async allEquipments(querys: any, limit: number = 10, offset: number = 0) {
    const resp = await this.authHttp.post(`${this.url}/equipment-products/stock/equipments/all`, {
      limit: limit,
      offset: offset,
      query: querys
    }).toPromise();
    return resp.json();
  }

  async getLot(productId: any) {
    const rs = await this.authHttp.get(`${this.url}/equipment-products/getLot?productId=${productId}`).toPromise();
    return rs.json();
  }

  async search(querys: any, equipmentType: any, limit: number = 10, offset: number = 0) {
    const resp = await this.authHttp.post(`${this.url}/equipment-products/stock/products/search`, {
      limit: limit,
      offset: offset,
      query: querys
    }).toPromise();
    return resp.json();
  }
  async addUnit(items: any) {
    const rs: any = await this.authHttp.put(`${this.url}/equipment-products/addUnit`, {
      items: items
    }).toPromise();
    return rs.json();
  }
  async editUnit(items: any) {
    const rs: any = await this.authHttp.put(`${this.url}/equipment-products/editUnit`, {
      items: items
    }).toPromise();
    return rs.json();
  }

  async getProductRemain(productId: any) {
    const resp = await this.authHttp.post(`${this.url}/equipment-products/remain`, {
      product_id: productId
    }).toPromise();
    return resp.json();
  }

  // async getEquipmentType() {
  //   const resp = await this.authHttp.get(`${this.url}/equipment-products/getEquipmentType`).toPromise();
  //   return resp.json();
  // }

}
