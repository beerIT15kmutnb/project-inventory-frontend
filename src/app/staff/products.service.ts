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

  async getProductPackage(id:any){
    const rs = await this.authHttp.get(`${this.url}/products/getProductPackage/${id}`).toPromise();
    return rs.json();
  }
  async getUnit() {
    const rs = await this.authHttp.get(`${this.url}/products/getUnit`).toPromise();
    return rs.json();
  }
  async saveAddProduct(items:any){
    const rs = await this.authHttp.put(`${this.url}/products/saveAddProduct`,{
      items:items
    }).toPromise();
    return rs.json();
  }async saveEditProduct(items:any){
    const rs = await this.authHttp.put(`${this.url}/products/saveEditProduct`,{
      items:items
    }).toPromise();
    return rs.json();
  }
  async saveAddGenerics(items:any){
    const rs = await this.authHttp.put(`${this.url}/products/saveAddGenerics`,{
      items:items
    }).toPromise();
    return rs.json();
  }async saveEditGenerics(items:any){
    const rs = await this.authHttp.put(`${this.url}/products/saveEditGenerics`,{
      items:items
    }).toPromise();
    return rs.json();
  }
  async allProducts(query: any, limit: number = 10, offset: number = 0) {
    const resp = await this.authHttp.post(`${this.url}/products/stock/products/all`, {
      limit: limit,
      offset: offset,
      query: query
    }).toPromise();
    return resp.json();
  }
  async allGenerics(query: any, limit: number = 10, offset: number = 0) {
    const resp = await this.authHttp.post(`${this.url}/products/stock/generics/all`, {
      limit: limit,
      offset: offset,
      query: query
    }).toPromise();
    return resp.json();
  }

  async getLot(productId: any) {
    const rs = await this.authHttp.get(`${this.url}/products/getLot?productId=${productId}`).toPromise();
    return rs.json();
  }

  async search(query: any, genericType: any, limit: number = 10, offset: number = 0) {
    const resp = await this.authHttp.post(`${this.url}/products/stock/products/search`, {
      limit: limit,
      offset: offset,
      query: query
    }).toPromise();
    return resp.json();
  }
  async addUnit(items:any){
    let rs:any =  await this.authHttp.put(`${this.url}/products/addUnit`,{
      items:items
    }).toPromise();
    return rs.json();
  }
  async editUnit(items:any){
    let rs:any =  await this.authHttp.put(`${this.url}/products/editUnit`,{
      items:items
    }).toPromise();
    return rs.json();
  }
  // async getProductStockDetail(productId: any) {
  //   const resp = await this.authHttp.get(`${this.url}/products/stock/remain/${productId}`).toPromise();
  //   return resp.json();
  // }

  // async getProductStockTotal() {
  //   const resp = await this.authHttp.post(`${this.url}/products/stock/products/total`, {}).toPromise();
  //   return resp.json();
  // }

  async getProductRemain(productId: any) {
    const resp = await this.authHttp.post(`${this.url}/products/remain`, {
      product_id: productId
    }).toPromise();
    return resp.json();
  }

  // async getProductRemainByWarehouse(productId: any, lotId: any, warehouseId: any) {
  //   const resp = await this.authHttp.post(`${this.url}/products/remain/warehouse`, {
  //     productId: productId,
  //     lotId: lotId,
  //     warehouseId: warehouseId
  //   }).toPromise();
  //   return resp.json();
  // }

  // async listall() {
  //   const resp = await this.authHttp.get(`${this.url}/products/listall`).toPromise();
  //   return resp.json();
  // }

  // async getProductWarehouse(srcwarehouseId: any, dstwarehouseId) {
  //   const resp = await this.authHttp.get(`${this.url}/products/getallproductinwarehouse/${srcwarehouseId}/${dstwarehouseId}`).toPromise();
  //   return resp.json();
  // }

  // async searchAllProducts(query: any) {
  //   const resp = await this.authHttp.get(`${this.url}/products/searchallproduct/${query}`).toPromise();
  //   return resp.json();
  // }

  // async getProductsInTemplate(templateId: any) {
  //   const resp = await this.authHttp.get(`${this.url}/products/getallproductintemplate/${templateId}`).toPromise();
  //   return resp.json();
  // }

  // async getWarehouseProductRemain(warehouseId: any, productId: any) {
  //   const resp = await this.authHttp.get(`${this.url}/products/getwarehouseproductremain/${warehouseId}/${productId}`).toPromise();
  //   return resp.json();
  // }

  async getGenericType() {
    const resp = await this.authHttp.get(`${this.url}/products/getGenericType`).toPromise();
    return resp.json();
  }

}
