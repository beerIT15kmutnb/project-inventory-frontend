import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  ViewChild
} from '@angular/core';
// import { Router } from '@angular/router';
// import { WarehouseService } from "../warehouse.service";
import { ReceiveService } from '../receive.service';
// import { RequisitionTypeService } from "../requisition-type.service";
import { RequisitionService } from '../requisition.service';
// import { UnitissueService } from "../unitissue.service";
// import { LabelerService } from "../labeler.service";
import { AlertService } from '../../alert.service';
// import { ProductlotsService } from "../productlots.service";
import { IMyOptions } from 'mydatepicker-th';
import { ActivatedRoute, Router, Params } from '@angular/router';
// import { PeriodService } from '../../period.service';
import { TransferDashboardService } from '../transfer-dashboard.service';
// import { LotService } from '../lot.service';

import { Headers } from '@angular/http';


// import { IProductReceive, IReceive, IRequisition, IRequisitionStructure, IProductRequisition } from "../../models";

import * as _ from 'lodash';
import * as numeral from 'numeral';
import * as moment from 'moment';

// import { WarehouseProductsService } from './../warehouse-products.service';
import { ProductsService } from './../../admin/products.service';
import { JwtHelper } from 'angular2-jwt';

import { AlertExpiredService } from './../alert-expired.service';
import { ToThaiDatePipe } from './../../helper/to-thai-date.pipe';
import { AdditionService } from './../addition.service';
// import { SearchGenericAutocompleteComponent } from 'app/directives/search-generic-autocomplete/search-generic-autocomplete.component';
// import { IGeneric, IUnit, IRequisitionOrderItem, IRequisitionOrder } from 'app/shared';
// import { SelectReceiveUnitComponent } from 'app/directives/select-receive-unit/select-receive-unit.component';
@Component({
  selector: 'app-addition',
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css']
})
export class AdditionComponent implements OnInit {
  generics: any;
  // @ViewChild('viewer') private viewer: any;
  // @ViewChild('modalRequisition') public modalRequisition: any;
  @ViewChild('modalLoading') public modalLoading: any;
  @ViewChild('productSearch') public productSearch: any;

  // @ViewChild('selectUnits') public selectUnits: SelectReceiveUnitComponent;
  // @ViewChild('searchGenericCmp') public searchGenericCmp: SearchGenericAutocompleteComponent;

  // public mask = [/\d/, /\d/, /\d/];
  selectedProduct: any = [];
  selectedProductName: string;
  selectedProductId: any;
  products = [];
  packageItems: any = [];
  issueDate = null;
  transectionId: null;
  issues: any = [];
  comment: any = null;
  remainQty = 0;

  productId: any = null;
  productName: any = null;

  reqQty: any = 0;
  searchGeneric: any = [];
  searchProduct: any = {
    small_qty: null,
    small_unit_name: null,
    large_unit_name: null
  };
  ////////////////////////

  warehouses: any[] = [];
  tmpwareHouses: any[] = [];
  withDrawWarehouses: any[] = [];
  wmRequisition: any;
  wmWithdraw: any;

  requisitionTypes: any[] = [];
  requisitionStatus: any[] = [];

  requisitionSummary: any = [];
  // products: Array<any> = [];
  requiSitionTypes: any = [];
  requisitionTypeID: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  requisitionId: any;
  requisitionDate: any;
  selectedGenericId: any;
  selectedGenericName: any;
  selectedWorkingCode: any;
  selectedUnitGenericId: any;
  selectedSmallQty: any = 0;
  selectedRequisitionQty: any;
  selectedTotalSmallQty: any = 0;
  requisitionCode: any;
  selectedRemainQty = 0;

  isUpdate = false;
  isSave = false;

  templates: any = [];
  templateId: any = null;

  constructor(
    private productService: ProductsService,
    private alertService: AlertService,
    private requisitionService: RequisitionService,
    private additionService: AdditionService,
    private route: ActivatedRoute,
    private router: Router,
    private transferDashboardService: TransferDashboardService,
    @Inject('API_URL') private apiUrl: string,
  ) {

  }

  async ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.generics = JSON.parse(params.generics);
      });
    if (this.generics) {
      this.products = _.map(this.generics, (v: any) => {
        return {
          generic_id: v.generic_id,
          generic_name: v.generic_name,
          remain_qty: v.qty,
          requisition_qty: v.max_qty - v.qty,
          small_unit_name: v.unit_name
        };
      });
    }

    const date = new Date();
    this.requisitionDate = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
  }

  changeSearchProduct(event) {
    if (event) {
      // this.productSearch.clearProductSearch();
      // this.clearForm();
    }
  }

  async setSelectedGeneric(event: any) {
    this.modalLoading.show();
    try {
      this.clearForm();
      this.searchGeneric = event;
      console.log(this.searchGeneric);

      this.selectedGenericId = event ? event.generic_id : null;
      if (this.selectedGenericId) {
        const rs = await this.transferDashboardService.getGenericDetail(this.selectedGenericId);
        if (rs.ok) {
          this.remainQty = rs.rows[0][0].qty;
          this.searchGeneric.small_unit_name = rs.rows[0][0].unit_name;
          console.log(rs.rows);

          this.modalLoading.hide();
        } else {
          this.alertService.error(rs.error);
          this.modalLoading.hide();
        }
      }
      // this.selectedProductName = event ? `${event.product_name}` : null;
    } catch (error) {
      console.log(error.message);
      this.modalLoading.hide();
    }

  }


  clearProductSearch() {
    this.selectedProductId = null;
  }
  async addProduct() {
    console.log(this.products);

    const idx = _.findIndex(this.products, { generic_id: this.selectedGenericId });
    if (idx > -1) {
      this.alertService.success('รายการซ้ำ', 'จำนวนจะไปเพิ่มในรายการเดิม');
      const newQty = +this.products[idx].requisition_qty + +this.reqQty;

      this.products[idx].requisition_qty = newQty;

    } else {

      const obj: any = {};
      obj.generic_id = this.searchGeneric.generic_id;
      obj.generic_name = this.searchGeneric.generic_name;
      obj.requisition_qty = +this.reqQty;
      obj.remain_qty = +this.remainQty;
      obj.small_unit_name = this.searchGeneric.small_unit_name;
      this.products.push(obj);
      // await this.alowcate(this.selectedProductId);

    }
    this.clearForm();
  }
  editChangereqQty(idx: any, qty: any) {
    this.products[idx].requisition_qty = +qty.value;
  }
  removeSelectedProduct(idx: any) {
    this.alertService.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
      .then(() => {
        this.products.splice(idx, 1);
      }).catch(() => { });
  }
  clearForm() {
    this.packageItems = [];
    this.remainQty = 0;
    this.reqQty = '';
    this.selectedProductId = null;
    this.selectedProductName = null;
    this.searchProduct = [];
    this.selectedProduct = [];
    this.searchGeneric = [];
    this.productSearch.clearProductSearch();
  }
  ///////////////////////////////





  async save() {
    // this.isSave = true;
    // tslint:disable-next-line:max-line-length
    const reqDate = this.requisitionDate.date ? `${this.requisitionDate.date.year}-${this.requisitionDate.date.month}-${this.requisitionDate.date.day}` : null;
    this.alertService.confirm('ต้องการบันทึกข้อมูล ใช่หรือไม่?')
      .then(async () => {
        const order: any = {};
        order.addition_date = reqDate;
        const products: Array<any> = [];
        console.log(this.products, order);
        if (!this.products.length) {
          this.alertService.error('กรุณาระบุจำนวนสินค้าที่ต้องการเบิก');
        } else {
          this.modalLoading.show();
          try {
            let rs: any;
            if (this.isUpdate) {
              // rs = await this.additionService.updateRequisitionOrder(this.requisitionId, order, this.products);
            } else {
              console.log(order, this.products);

              rs = await this.additionService.saveAdditionOrder(order, this.products);
            }
            this.modalLoading.hide();
            this.isSave = false;
            if (rs.ok) {
              this.alertService.success();
              this.router.navigate(['/admin/transfer-dashboard']);
            } else {
              this.alertService.error(rs.error);
            }
          } catch (error) {
            this.isSave = false;
            this.modalLoading.hide();
            this.alertService.error(error.message);
          }
        }
      })
      .catch(() => {
        this.isSave = false;
        this.modalLoading.hide();
      });

  }
}
