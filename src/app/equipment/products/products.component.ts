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

  currentPage2: any = 1;
  totalEquipments = 0;
  equipments: any;
  selectedTab: any = 'product';
  modalAddProduct = false
  modalEditProduct = false
  items: any = []
  modalAddEquipments = false;
  itemEquipments: any = []
  products = [];
  equipmentTypes = [];
  equipmentType: any = "";
  loading = false;
  totalProducts = 0;
  perPage = 20;
  isSearching = false;
  token: any;
  equipmentTypeIds = [];
  query: any = '';
  currentPage: any = 1;
  units: any
  selectedEquipmentName: any
  jwtHelper: JwtHelper = new JwtHelper();
  @ViewChild('htmlPreview') public htmlPreview: any;
  @ViewChild('modalLoading') public modalLoading: any;
  @ViewChild('pagination') pagination: any;
  @ViewChild('pagination2') pagination2: any;
  @ViewChild('equipmentSearch') public equipmentSearch: any;
  constructor(
    private alertService: AlertService,
    private productService: ProductsService,
    @Inject('API_URL') private apiUrl: string,
  ) {
    this.token = sessionStorage.getItem('token');
    // const decoded = this.jwtHelper.decodeToken(this.token);
    // this.equipmentTypeIds = decoded.equipment_type_id ? decoded.equipment_type_id.split(',') : [];
  }

  ngOnInit() {
    this.getUnit();
    // this.getEquipmentType()
  }
  setTapActive(set: any) {
    this.query = ''
    this.selectedTab = set
    if (this.selectedTab === 'product') {
      this.getAllProducts()
    } else if (this.selectedTab === 'equipments') {
      this.getAllEquipments()
    }

  }
  search(event) {
    console.log(event);
    if (this.selectedTab === 'product') {
      if (event.keyCode === 13) {
        this.getAllProducts();
      } else if (event.keyCode === 8 && this.query == '') {
        this.getAllProducts();
      }
    } else if (this.selectedTab === 'equipments') {
      if (event.keyCode === 13) {
        this.getAllEquipments();
      } else if (event.keyCode === 8 && this.query == '') {
        this.getAllEquipments();
      }
    }
  }

  async getUnit() {
    this.modalLoading.show();
    try {
      const rs = await this.productService.getUnit();
      console.log(rs.row);

      if (rs.ok) {
        this.units = rs.rows;
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
  }

  async addEquipments() {
    this.modalAddEquipments = true;
    this.itemEquipments = {
      equipment_name: '',
      // equipment_type_id: '',
      small_unit_id: '',
      is_active: 'Y',
      equipment_code: '',
      comment: ''
    };
  }

  async addProduct() {
    this.modalEditProduct = true;
    this.items = {
      product_id: null,
      product_name: '',
      equipment_id: '',
      equipment_code: '',
      is_active: 'Y',
      product_code: '',
      small_unit_id: '',
      large_unit_id: '',
      small_qty: 1,
      description: '',
      min_qty: 0,
      max_qty: 0
    };
  }
  async saveAddProduct() {
    console.log(this.items);

    this.modalLoading.show();
    try {
      const rs = await this.productService.saveAddProduct(this.items);
      console.log(rs.row);

      if (rs.ok) {
        this.alertService.success();
        this.getAllProducts();
        this.modalEditProduct = false;
        this.items = [];
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
  }
  async saveAddEquipments() {
    console.log(this.itemEquipments);

    this.modalLoading.show();
    try {
      const rs = await this.productService.saveAddEquipments(this.itemEquipments);
      console.log(rs.row);

      if (rs.ok) {
        this.alertService.success();
        this.getAllEquipments();
        this.modalAddEquipments = false;
        this.items = [];
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
  }
  async saveEditProduct() {
    this.modalLoading.show();
    try {
      const rs = await this.productService.saveEditProduct(this.items);
      console.log(rs.row);

      if (rs.ok) {
        this.alertService.success();
        this.getAllProducts();
        this.modalEditProduct = false;
        this.items = [];
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
  }
  async saveEditEquipments() {
    console.log(this.itemEquipments);
    this.modalLoading.show();
    try {
      const rs = await this.productService.saveEditEquipments(this.itemEquipments);
      console.log(rs.row);

      if (rs.ok) {
        this.alertService.success();
        this.getAllEquipments();
        this.modalAddEquipments = false;
        this.items = [];
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
  }
  editProduct(p: any) {
    this.items = p;
    this.modalEditProduct = true;

  }
  editEquipment(p: any) {
    this.itemEquipments = p;
    this.modalAddEquipments = true;

  }
  close() {
    this.items = [];
    this.modalEditProduct = false;
    this.itemEquipments = [];
    this.modalAddEquipments = false;
  }
  changActiveEquipment(event: any) {
    this.itemEquipments.is_active = event.target.checked ? 'Y' : 'N';
  }
  changActive(event: any) {
    this.items.is_active = event.target.checked ? 'Y' : 'N';
  }
  async doSearch() {
    try {
      this.modalLoading.show();
      this.query = this.query ? this.query : '';
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
  async changeSearchEquipment(event: any) {
    console.log(event);
    // this.equipmentSearch.clearProductSearch();
    // this.clearForm();
    // this.items.equipment_id =  event ? event.equipment_id : null;
    // this.items.equipment_name =  event ? event.equipment_name : null;
    // this.items.equipment_code =  event ? event.equipment_code : null;
  }
  async setSelectedEquipment(event: any) {
    console.log(event);
    if (event) {
      this.items.equipment_id = event ? event.equipment_id : null;
      this.items.equipment_name = event ? event.equipment_name : null;
      this.items.small_unit_id = event ? event.small_unit_id : null;
      this.items.equipment_code = event ? event.equipment_code : null;
      console.log(this.items.equipment_name);


    }
  }
  setisActiveGen(active: any, id: any) {
    const status = active.target.checked ? 'Y' : 'N';
    this.modalLoading.show();
    this.productService.isActiveEquipment(id, status)
      .then((result: any) => {
        if (result.ok) {
          this.alertService.success();
        } else {
          this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(result.error));
        }
        this.modalLoading.hide();
      })
      .catch(() => {
        this.modalLoading.hide();
        this.alertService.serverError();
      });
  }
  setisActive(active: any, id: any) {
    const status = active.target.checked ? 'Y' : 'N';
    this.modalLoading.show();
    this.productService.isActiveProduct(id, status)
      .then((result: any) => {
        if (result.ok) {
          this.alertService.success();
        } else {
          this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(result.error));
        }
        this.modalLoading.hide();
      })
      .catch(() => {
        this.modalLoading.hide();
        this.alertService.serverError();
      });
  }
  clearForm() {
    this.equipmentSearch.clearProductSearch();
  }
  async getAllProducts() {
    this.modalLoading.show();
    try {
      this.query = this.query ? this.query : '';
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

  async getAllEquipments() {
    this.modalLoading.show();
    try {
      this.query = this.query ? this.query : '';
      const rs = await this.productService.allEquipments(this.query, this.perPage, 0);
      if (rs.ok) {
        this.equipments = rs.rows[0];
        this.totalEquipments = rs.total;
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
  async refreshEquipments(state: State) {
    this.modalLoading.show();
    const offset = +state.page.from;
    const limit = +state.page.size;

    // if (!this.currentPage2) {
    //   this.currentPage2 = 1//this.pagination2.currentPage;
    // } else {
    //   this.currentPage2 = this.currentPage2 > this.pagination2.lastPage ? this.pagination2.currentPage : this.pagination2.currentPage;
    // }

    try {
      let rs: any;
      this.query = this.query ? this.query : '';
      rs = await this.productService.allEquipments(this.query, limit, offset);

      this.modalLoading.hide();
      if (rs.ok) {
        this.equipments = rs.rows[0];
        console.log(this.equipments);
        this.totalEquipments = rs.total;
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
      let rs: any;
      this.query = this.query ? this.query : '';
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

  // async getEquipmentType() {
  //   try {
  //     const rs = await this.productService.getEquipmentType();
  //     if (rs.ok) {
  //       this.equipmentTypes = rs.rows;
  //     } else {
  //       this.alertService.error(rs.error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.alertService.serverError();
  //   }
  // }

  async changeEquipmentType() {
    //   try {
    //     this.modalLoading.show();
    //     let rs: any;
    //     const _equipmentType = this.equipmentType === '' ? this.equipmentTypeIds : this.equipmentType;
    //     if (this.query) {
    //       rs = await this.productService.search(this.query, _equipmentType, this.perPage, 0);
    //     } else {
    //       rs = await this.productService.all(_equipmentType, this.perPage, 0);
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
