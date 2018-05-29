// import { ProductsService } from './../products.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { State } from '@clr/angular';
import { JwtHelper } from 'angular2-jwt';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: []
})
export class ProductsComponent implements OnInit {
 
  currentPage2:any = 1;
  totalGenerics = 0;
  generics: any;
  selectedTab: any = 'product';
  modalAddProduct = false
  modalEditProduct = false
  items: any = []
  modalAddGenerics = false;
  itemGenerics: any = []
  products = [];
  genericTypes = [];
  genericType: any = "";
  loading = false;
  totalProducts = 0;
  perPage = 20;
  isSearching = false;
  token: any;
  genericTypeIds = [];
  query: any = '';
  currentPage:any = 1;
  units: any
  selectedGenericName: any
  jwtHelper: JwtHelper = new JwtHelper();
  @ViewChild('htmlPreview') public htmlPreview: any;
  @ViewChild('modalLoading') public modalLoading: any;
  @ViewChild('pagination') pagination: any;
  @ViewChild('pagination2') pagination2: any;
  @ViewChild('genericSearch') public genericSearch: any;
  constructor(
    private alertService: AlertService,
    private productService: ProductsService,
    @Inject('API_URL') private apiUrl: string,
  ) {
    this.token = sessionStorage.getItem('token');
    // const decoded = this.jwtHelper.decodeToken(this.token);
    // this.genericTypeIds = decoded.generic_type_id ? decoded.generic_type_id.split(',') : [];
  }

  ngOnInit() {
    this.getUnit();
    this.getGenericType()
  }
  setTapActive(set: any) {
    this.query = ''
    this.selectedTab = set
    if (this.selectedTab === 'product') {
      this.getAllProducts()
    } else if (this.selectedTab === 'generics') {
      this.getAllGenerics()
    }

  }
  search(event) {
    console.log(event);
    if (this.selectedTab === 'product') {
      if (event.keyCode === 13) {
        this.getAllProducts()
      } else if (event.keyCode === 8 && this.query == '') {
        this.getAllProducts()
      }
    } else if (this.selectedTab === 'generics') {
      if (event.keyCode === 13) {
        this.getAllGenerics()
      } else if (event.keyCode === 8 && this.query == '') {
        this.getAllGenerics()
      }
    }
  }

  async getUnit() {
    this.modalLoading.show()
    try {
      const rs = await this.productService.getUnit()
      console.log(rs.row);

      if (rs.ok) {
        this.units = rs.rows
      }
    } catch (error) {
      this.alertService.error(error)
    }
    this.modalLoading.hide()
  }

  async addGenerics() {
    this.modalAddGenerics = true
    this.itemGenerics = {
      generic_name: '',
      generic_type_id: '',
      small_unit_id:'',
      is_active: 'Y',
      min_qty: 0,
      max_qty: 0,
      generic_code: '',
      comment:'' 
    }
  }

  async addProduct() {
    this.modalEditProduct = true
    this.items = {
      product_id:null,
      product_name: '',
      generic_id: '',
      generic_code: '',
      is_active: 'Y',
      product_code: '',
      small_unit_id: '',
      large_unit_id: '',
      small_qty: 1,
      description: ''
    }
  }
  async saveAddProduct() {
    console.log(this.items);

    this.modalLoading.show()
    try {
      const rs = await this.productService.saveAddProduct(this.items)
      console.log(rs.row);

      if (rs.ok) {
        this.alertService.success()
        this.modalEditProduct = false
        this.items = []
      } else {
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }
    this.modalLoading.hide()
  }
  async saveAddGenerics() {
    console.log(this.itemGenerics);

    this.modalLoading.show()
    try {
      const rs = await this.productService.saveAddGenerics(this.itemGenerics)
      console.log(rs.row);

      if (rs.ok) {
        this.alertService.success()
        this.modalAddGenerics = false
        this.items = []
      } else {
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }
    this.modalLoading.hide()
  }
  async saveEditProduct() {
    this.modalLoading.show()
    try {
      const rs = await this.productService.saveEditProduct(this.items)
      console.log(rs.row);

      if (rs.ok) {
        this.alertService.success()
        this.modalEditProduct = false
        this.items = []
      } else {
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }
    this.modalLoading.hide()
  }
  async saveEditGenerics() {
    console.log(this.itemGenerics);
    
    this.modalLoading.show()
    try {
      const rs = await this.productService.saveEditGenerics(this.itemGenerics)
      console.log(rs.row);

      if (rs.ok) {
        this.alertService.success()
        this.modalAddGenerics = false
        this.items = []
      } else {
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }
    this.modalLoading.hide()
  }
  editProduct(p: any) {
    this.items = p
    this.modalEditProduct = true

  }
  editGeneric(p: any) {
    this.itemGenerics = p
    this.modalAddGenerics = true

  }
  close() {
    this.items = []
    this.modalEditProduct = false
    this.itemGenerics = []
    this.modalAddGenerics = false
  }
  changActiveGeneric(event: any) {
    this.itemGenerics.is_active = event.target.checked ? 'Y' : 'N';
  }
  changActive(event: any) {
    this.items.is_active = event.target.checked ? 'Y' : 'N';
  }
  async doSearch() {
    try {
      this.modalLoading.show();
      this.query = this.query ? this.query : ''
      const rs = await this.productService.allProducts(this.query, this.perPage, 0);
      if (rs.ok) {
        this.products = rs.rows[0];
        this.totalProducts = rs.total;
      } else {
        this.alertService.error(rs.error);
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.serverError();
    }
  }
  checkActive(event: any) {

  }
  async changeSearchGeneric(event: any) {
    console.log(event);
    // this.genericSearch.clearProductSearch();
    // this.clearForm();
    // this.items.generic_id =  event ? event.generic_id : null;
    // this.items.generic_name =  event ? event.generic_name : null;
    // this.items.generic_code =  event ? event.generic_code : null;
  }
  async setSelectedGeneric(event: any) {
    console.log(event);
    if (event) {
      this.items.generic_id = event ? event.generic_id : null;
      this.items.generic_name = event ? event.generic_name : null;
      this.items.small_unit_id = event ? event.small_unit_id : null;
      this.items.generic_code = event ? event.generic_code : null;
      console.log(this.items.generic_name);


    }
  }
  clearForm() {
    this.genericSearch.clearProductSearch();
  }
  async getAllProducts() {
    this.modalLoading.show();
    try {
      this.query = this.query ? this.query : ''
      const rs = await this.productService.allProducts(this.query, this.perPage, 0);
      if (rs.ok) {
        this.products = rs.rows[0];
        this.totalProducts = rs.total;
        console.log(rs.total);


      } else {
        this.alertService.error(rs.error);
      }

      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getAllGenerics() {
    this.modalLoading.show();
    try {
      this.query = this.query ? this.query : ''
      const rs = await this.productService.allGenerics(this.query, this.perPage, 0);
      if (rs.ok) {
        this.generics = rs.rows[0];
        this.totalGenerics = rs.total;
        console.log(rs.total);
      } else {
        this.alertService.error(rs.error);
      }

      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      console.log(error);
      this.alertService.serverError();
    }
  }
  async refreshGenerics(state: State) {
    this.modalLoading.show();
    const offset = +state.page.from;
    const limit = +state.page.size;

    // if (!this.currentPage2) {
    //   this.currentPage2 = 1//this.pagination2.currentPage;
    // } else {
    //   this.currentPage2 = this.currentPage2 > this.pagination2.lastPage ? this.pagination2.currentPage : this.pagination2.currentPage;
    // }

    try {
      let rs: any
      this.query = this.query ? this.query : ''
      rs = await this.productService.allGenerics(this.query, limit, offset);

      this.modalLoading.hide();
      if (rs.ok) {
        this.generics = rs.rows[0];
        console.log(this.generics);
        this.totalGenerics = rs.total;
      } else {
        this.alertService.error(rs.error);
      }

    } catch (error) {
      this.modalLoading.hide();
      this.alertService.serverError();
      console.log(error.message);
    }
  }
  async refresh(state: State) {
    this.modalLoading.show();
    const offset = +state.page.from;
    const limit = +state.page.size;

    // if (!this.currentPage) {
    //   this.currentPage = 1 //this.pagination.currentPage;
    // } else {
    //   this.currentPage = this.currentPage > this.pagination.lastPage ? this.pagination.currentPage : this.pagination.currentPage;
    // }
    try {
      let rs: any
      this.query = this.query ? this.query : ''
      rs = await this.productService.allProducts(this.query, limit, offset);

      this.modalLoading.hide();
      if (rs.ok) {
        this.products = rs.rows[0];
        console.log(this.products);
        this.totalProducts = rs.total;
      } else {
        this.alertService.error(rs.error);
      }

    } catch (error) {
      this.modalLoading.hide();
      this.alertService.serverError();
      console.log(error.message);
    }
  }

  showStockCard(p: any) {
    // const url = `${this.apiUrl}/report/product/balance/${p.product_id}?token=${this.token}`;
    // this.htmlPreview.showReport(url);
  }

  async getGenericType() {
    try {
      const rs = await this.productService.getGenericType();
      if (rs.ok) {
        this.genericTypes = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async changeGenericType() {
    //   try {
    //     this.modalLoading.show();
    //     let rs: any;
    //     const _genericType = this.genericType === '' ? this.genericTypeIds : this.genericType;
    //     if (this.query) {
    //       rs = await this.productService.search(this.query, _genericType, this.perPage, 0);
    //     } else {
    //       rs = await this.productService.all(_genericType, this.perPage, 0);
    //     }
    //     this.modalLoading.hide();
    //     if (rs.ok) {
    //       this.products = rs.rows;
    //       this.totalProducts = rs.total;
    //       this.currentPage = 1;
    //     } else {
    //       this.alertService.error(rs.error);
    //     }

    //   } catch (error) {
    //     this.modalLoading.hide();
    //     this.alertService.serverError();
    //     console.log(error.message);
    //   }
  }

}
