import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  ViewChild
} from '@angular/core';
// import { Router } from '@angular/router';
// import { WarehouseService } from "../warehouse.service";
import { ReceiveService } from "../receive.service";
// import { RequisitionTypeService } from "../requisition-type.service";
import { RequisitionService } from "../requisition.service";
// import { UnitissueService } from "../unitissue.service";
// import { LabelerService } from "../labeler.service";
import { AlertService } from "../../alert.service";
// import { ProductlotsService } from "../productlots.service";
import { IMyOptions } from 'mydatepicker-th';
import { ActivatedRoute, Router, Params } from '@angular/router';
// import { PeriodService } from '../../period.service';

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
// import { SearchGenericAutocompleteComponent } from 'app/directives/search-generic-autocomplete/search-generic-autocomplete.component';
// import { IGeneric, IUnit, IRequisitionOrderItem, IRequisitionOrder } from 'app/shared';
// import { SelectReceiveUnitComponent } from 'app/directives/select-receive-unit/select-receive-unit.component';
@Component({
  selector: 'wm-requisition-new',
  templateUrl: './requisition-new.component.html'
})
export class RequisitionNewComponent implements OnInit {
  // @ViewChild('viewer') private viewer: any;
  // @ViewChild('modalRequisition') public modalRequisition: any;
  @ViewChild('modalLoading') public modalLoading: any;
  @ViewChild('productSearch') public productSearch: any;

  // @ViewChild('selectUnits') public selectUnits: SelectReceiveUnitComponent;
  // @ViewChild('searchGenericCmp') public searchGenericCmp: SearchGenericAutocompleteComponent;

  // public mask = [/\d/, /\d/, /\d/];
  selectedProduct: any =[]
  selectedProductName: string;
  selectedProductId: any;
  products = [];
  packageItems: any = []
  issueDate = null;
  transectionId: null;
  issues: any = [];
  comment: any = null;
  remainQty = 0;

  productId: any = null;
  productName: any = null;

  reqQty: any = 0;
  searchGeneric: any = []
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
  selectedRemainQty: number = 0;

  isUpdate = false;
  isSave = false;

  templates: any = [];
  templateId: any = null;

  constructor(
    // private wareHouseService: WarehouseService,
    private productService: ProductsService,
    private alertService: AlertService,
    private requisitionService: RequisitionService,
    // private requisitionTypeService: RequisitionTypeService,
    private route: ActivatedRoute,
    private router: Router,
    // private warehouseProductService: WarehouseProductsService,
    @Inject('API_URL') private apiUrl: string,
    // private periodService: PeriodService
  ) {
    this.requisitionId = this.route.snapshot.params['requisitionId'];
  }

  async ngOnInit() {

    const date = new Date();
    this.requisitionDate = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };

    // await this.getTypes();
    // await this.getWarehouses();

    if (this.requisitionId) {
      await this.setReqs();
      await this.setReqsDetail()
      this.isUpdate = true;
    }

  }
  ///////////////////////////////////////////////////////
  async setReqsDetail() {
    try {
      let rs = await this.requisitionService.setReqsDetail(this.requisitionId)
      if (rs.ok) {
        console.log(rs.rows[0]);

        this.products = _.map(rs.rows[0], (v) => {
          return {
            requisition_order_id: v.requisition_order_id,
            product_name: v.product_name,
            requisition_qty: +v.requisition_qty,
            product_id: v.product_id,
            remain_qty: v.remainQty,
            large_unit_name: v.lm,
            small_qty: +v.small_qty,
            small_unit_name: v.sm,
            generic_name: v.generic_name
          }
        })
        // for (let v of this.products) {
        //   let rss = await this.requisitionService.setReqsProductDetail(v.requisition_order_id)
        //   if (rss.ok) {
        //     console.log(rss.rows[0]);

        //     v.items = _.map(rss.rows[0], (e) => {
        //       return {
        //         requisition_order_id: e.requisition_order_id,
        //         product_id: e.product_id,
        //         lot_no: e.lot_no,
        //         qty: e.qty,
        //         wm_product_id: e.wm_product_id,
        //         remainQty :e.remainQty,
        //         remainQtyB: e.remainQtyB,
        //         expired_date: e.expired_date
        //       }
        //     })
        //   }
        // }

      } else {
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }
  }
  async setReqs() {
    try {
      let rs = await this.requisitionService.setReqs(this.requisitionId)
      console.log(rs);
      if (rs.ok && rs.rows) {
        let res = rs.rows
        this.requisitionDate = {
          date: {
            year: moment(res.requisition_date).get('year'),
            month: moment(res.requisition_date).get('month') + 1,
            day: moment(res.requisition_date).get('date')
          }
        };
        this.requisitionCode = res.requisition_code;
        // this.comment = res.comment
      } else {
        this.alertService.error(rs.error)
      }
    } catch (error) {
      console.log(error);

      this.alertService.error(error)
    }

  }
  changeSearchProduct(event) {
    if (event) {
      // this.productSearch.clearProductSearch();
      // this.clearForm();
    }
  }

  async setSelectedGeneric(event: any) {
    this.modalLoading.show()
    try {
      this.clearForm()
      this.searchGeneric = event;
      this.selectedGenericId = event ? event.generic_id : null;
      if (this.selectedGenericId) {
        const rs = await this.productService.getProductPackage(this.selectedGenericId)
        if (rs.ok) {
          this.packageItems = rs.rows[0]
          console.log(this.packageItems);
          this.modalLoading.hide()
        } else {
          this.alertService.error(rs.error)
          this.modalLoading.hide()
        }
      }
      // this.selectedProductName = event ? `${event.product_name}` : null;
    } catch (error) {
      console.log(error.message);
      this.modalLoading.hide()
    }

  }

  async addProductItem(p: any) {
    console.log(p);
    this.modalLoading.show()
    this.setSelectedProduct(p)
  }
  async setSelectedProduct(event: any) {
    try {
      this.searchProduct = event;
      this.selectedProductId = event ? event.product_id : null;
      if (this.selectedProductId) {
        const rs = await this.productService.getProductRemain(this.selectedProductId)
        this.remainQty = rs.data[0].qty
      }
      this.selectedProductName = event ? `${event.product_name}` : null;
    } catch (error) {
      console.log(error.message);
    }
    this.modalLoading.hide()
  }


  clearProductSearch() {
    this.selectedProductId = null;
  }


  async addProduct() {
    const idx = _.findIndex(this.products, { product_id: this.selectedProductId });
    if (idx > -1) {
      this.alertService.success('รายการซ้ำ', 'จำนวนจะไปเพิ่มในรายการเดิม');
      const newQty = +this.products[idx].requisition_qty + +this.reqQty;
      if (newQty > +this.products[idx].remain_qty) {
        this.products[idx].requisition_qty = this.products[idx].remain_qty;
      } else {
        this.products[idx].requisition_qty = newQty;
      }
    } else {
      if (this.remainQty < this.reqQty) {
        this.alertService.error('จำนวนจ่าย มากกว่าจำนวน คงเหลือ');
      } else {
        const obj: any = {};
        obj.generic_name = this.searchGeneric.generic_name
        obj.requisition_qty = +this.reqQty;
        obj.product_id = this.selectedProductId;
        obj.product_name = this.selectedProductName;
        obj.remain_qty = +this.remainQty;
        obj.large_unit_name = this.searchProduct.large_unit_name
        obj.small_qty = this.searchProduct.small_qty
        obj.small_unit_name = this.searchProduct.small_unit_name
        obj.items = [];
        this.products.push(obj);
        await this.alowcate(this.selectedProductId);
      }
    }
    this.clearForm();
  }

  async alowcate(productId) {
    this.modalLoading.show();
    try {
      let list
      let result: any = await this.productService.getLot(productId);
      console.log(result);

      if (result.ok) {
        list = result.data[0];
        if (this.products) {
          let idx = _.findIndex(this.products, { product_id: productId })
          let _data = {};
          console.log(list);
          let requisition_qty = this.products[idx].requisition_qty
          if (idx > -1) {
            _.forEach(list, (v) => {
              if (v.remainQty > 0)
                if (v.remainQty >= requisition_qty) {
                  v.qty = requisition_qty
                  v.remainQtyB = v.remainQty - requisition_qty
                } else {
                  v.qty = v.remainQty
                  v.remainQtyB = v.remainQty - v.qty
                }
              requisition_qty = requisition_qty - v.qty

            })
            this.products[idx].items = list;
          }
        } else {
          this.alertService.error();
        }
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error.message);
    }
  }

  editChangereqQty(idx: any, qty: any) {
    if ((+qty.value) > +this.products[idx].remain_qty) {
      this.alertService.error('จำนวนจ่าย มากกว่าจำนวนคงเหลือ');
      this.products[idx].requisition_qty = '';
    } else {
      this.products[idx].requisition_qty = +qty.value;
    }
  }

  changeQtyGrid(e) {
    // console.log(e);

    let total_base = 0;
    e.forEach(v => {
      total_base += (+v.qty);
    });
    console.log(e[0].product_id);

    const idx = _.findIndex(this.products, { product_id: +e[0].product_id });
    if (idx > -1) {
      this.products[idx].requisition_qty = total_base;
    }
    console.log(idx);
    console.log(this.products);
    console.log(this.products[idx]);

  }

  removeSelectedProduct(idx: any) {
    this.alertService.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
      .then(() => {
        this.products.splice(idx, 1);
      }).catch(() => { });
  }

  clearForm() {
    this.packageItems = []
    this.remainQty = 0;
    this.reqQty = '';
    this.selectedProductId = null;
    this.selectedProductName = null;
    this.searchProduct = []
    this.selectedProduct = []
    this.productSearch.clearProductSearch();
  }
  async save() {
    // this.isSave = true;
    const reqDate = this.requisitionDate.date ? `${this.requisitionDate.date.year}-${this.requisitionDate.date.month}-${this.requisitionDate.date.day}` : null;
    this.alertService.confirm('ต้องการบันทึกข้อมูล ใช่หรือไม่?')
      .then(async () => {
        const order: any = {};
        // console.log(this.requisitionDate.date);
        order.requisition_date = reqDate;
        //     order.requisition_type_id = this.requisitionTypeID;
        order.wm_requisition = 2 //this.wmRequisition;
        order.wm_withdraw = 1 //this.wmWithdraw;

        const products: Array<any> = [];

        // this.products.forEach((v: any) => {
        //   if (v.requisition_qty > 0) {
        //     const obj: any = {};
        //     obj.product_id = v.product_id;
        //     obj.requisition_qty = v.requisition_qty;
        //     // obj.unit_generic_id = v.unit_generic_id;
        //     products.push(obj);
        //   }
        // });
        console.log(this.products, order);

        if (!this.products.length) {
          this.alertService.error('กรุณาระบุจำนวนสินค้าที่ต้องการเบิก');
          // this.isSave = false;
        } else {
          this.modalLoading.show();
          try {
            let rs: any;
            if (this.isUpdate) {
              console.log(21111);

              rs = await this.requisitionService.updateRequisitionOrder(this.requisitionId, order, this.products);
            } else {
              rs = await this.requisitionService.saveRequisitionOrder(order, this.products);
            }

            this.modalLoading.hide();
            this.isSave = false;
            if (rs.ok) {
              this.alertService.success()
              this.router.navigate(['/admin/requisition']);
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
      })

  }
  async saveReqs() {
    //   const issueDate = this.issueDate ? `${this.issueDate.date.year}-${this.issueDate.date.month}-${this.issueDate.date.day}` : null;
    //   this.alertService.confirm('ต้องการบันทึกรายการ ตัดจ่าย ใช่หรือไม่?')
    //     .then(() => {
    //       this.modalLoading.show();
    //       const summary: any = {};
    //       summary.issueDate = this.issueDate ? `${this.issueDate.date.year}-${this.issueDate.date.month}-${this.issueDate.date.day}` : null;
    //       summary.transectionId = this.transectionId;
    //       summary.comment = this.comment;
    //       let isError = false;
    //       this.products.forEach(v => {
    //         const totalReqs = v.requisition_qty;
    //         if (totalReqs > v.remain_qty || v.requisition_qty <= 0) {
    //           isError = true;
    //         }
    //       });

    //       if (isError) {
    //         this.alertService.error('มีจำนวนที่มียอดจ่ายมากกว่ายอดคงเหลือ หรือ ไม่ได้ระบุจำนวนจ่าย');
    //         this.modalLoading.hide();
    //       } else {
    //         this.issueService.saveReqs(summary, this.products)
    //           .then((results: any) => {
    //             if (results.ok) {
    //               this.alertService.success();
    //               this.router.navigate(['/admin/issues']);
    //             } else {
    //               this.alertService.error(results.error);
    //             }
    //             this.modalLoading.hide();
    //           })
    //           .catch((error: any) => {
    //             this.modalLoading.hide();
    //             this.alertService.error(error.message);
    //           });
    //       }
    //     }).catch(() => {
    //       this.modalLoading.hide();
    //     });
  }

  // setSelectedGeneric(e) {
  //   this.products.push(e);
  // }

  ///////////////////////////////////////////////////////
  async getTypes() {
    // this.modalLoading.show();
    // try {
    //   const rs: any = await this.requisitionTypeService.all();
    //   this.modalLoading.hide();
    //   if (rs.ok) {
    //     this.requiSitionTypes = rs.rows;
    //   }
    // } catch (error) {
    //   this.modalLoading.hide();
    //   this.alertService.error(error.message);
    //   console.error(error);
    // }
  }

  async getWarehouses() {
    // this.modalLoading.show();
    // try {
    //   const rs: any = await this.wareHouseService.getWarehouse();
    //   this.modalLoading.hide();
    //   if (rs.ok) {
    //     this.warehouses = _.sortBy(rs.rows, 'short_code');
    //     // this.wareHouses = _.clone(this.tmpwareHouses);
    //   }
    // } catch (error) {
    //   this.modalLoading.hide();
    //   this.alertService.error(error.message);
    //   console.error(error);
    // }
  }

  async getOrderItems() {
    // this.modalLoading.show();
    // this.products = [];
    // try {
    //   const rs: any = await this.requisitionService.getEditRequisitionOrderItems(this.requisitionId);
    //   this.modalLoading.hide();
    //   if (rs.ok) {
    //     this.products = rs.rows;
    //   } else {
    //     this.alertService.error(rs.error);
    //   }
    // } catch (error) {
    //   this.modalLoading.hide();
    //   console.log(error);
    //   this.alertService.error(error.message);
    // }
  }

  async getOrderDetail() {
    // this.modalLoading.show();
    // try {
    //   const rs: any = await this.requisitionService.getOrderDetail(this.requisitionId);
    //   this.modalLoading.hide();
    //   if (rs.ok) {
    //     const detail: IRequisitionOrder = <IRequisitionOrder>rs.detail;
    //     this.requisitionCode = detail ? detail.requisition_code : null;
    //     this.requisitionTypeID = detail ? detail.requisition_type_id : null;

    //     this.wmWithdraw = detail ? detail.wm_withdraw : null;
    //     this.wmRequisition = detail ? detail.wm_requisition : null;

    //     await this.onSelectWarehouses(null);

    //     if (detail.requisition_date) {
    //       this.requisitionDate = {
    //         date: {
    //           year: moment(detail.requisition_date).get('year'),
    //           month: moment(detail.requisition_date).get('month') + 1,
    //           day: moment(detail.requisition_date).get('date')
    //         }
    //       }
    //     }
    //   } else {
    //     this.alertService.error(rs.error);
    //   }

    // } catch (error) {
    //   this.modalLoading.hide();
    //   this.alertService.error(error.message);
    // }
  }

  changeSearchGeneric(event: any) {
    // if (event) {
    //   this.clearItem();
    // }
  }

  clearItem() {
    // this.selectUnits.clearUnits();
    // this.selectedGenericId = null;
    // this.selectedUnitGenericId = null;
    // this.selectedGenericName = null;
    // this.selectedWorkingCode = null;
    // this.selectedSmallQty = 0;
    // this.selectedTotalSmallQty = 0;
    // this.selectedRequisitionQty = '';
    // this.selectedRemainQty = 0;
    // this.searchGenericCmp.clearSearch();
  }

  // setSelectedGeneric(generic: any) {
  // this.selectedGenericId = generic.generic_id;
  // this.selectedGenericName = generic.generic_name;
  // this.selectedWorkingCode = generic.working_code;
  // this.selectedRemainQty = generic.qty;
  // this.selectedRequisitionQty = 1;

  // this.selectUnits.getUnits(generic.generic_id);
  // }

  onChangeUnit(event: any) {
    // this.selectedUnitGenericId = event.unit_generic_id;
    // this.selectedSmallQty = event.qty;
  }

  onChangeEditUnit(event: any, idx: any) {
    // this.products[idx].unit_generic_id = event.unit_generic_id;
    // this.products[idx].to_unit_qty = event.qty;
    // this.products[idx].from_unit_name = event.from_unit_name;
    // this.products[idx].to_unit_name = event.to_unit_name;
    // this.products[idx].qty = event.qty;
  }

  onChangeEditQty(idx: any, qty: any) {
    // this.products[idx].requisition_qty = qty;
  }

  qtyEnter(event: any) {
    // if (event.keyCode === 13) {
    //   this.addProduct();
    // }
  }

  // addProduct() {
  // const idx = _.findIndex(this.products, { generic_id: this.selectedGenericId })
  // if (idx > -1) {
  //   this.alertService.error('รายการซ้ำกรุณาแก้ไขรายการเดิม')
  // } else {
  //   const product: IRequisitionOrderItem = {};
  //   product.generic_id = this.selectedGenericId;
  //   product.requisition_qty = this.selectedRequisitionQty;
  //   product.generic_name = this.selectedGenericName;
  //   product.to_unit_qty = this.selectedSmallQty;
  //   product.unit_generic_id = this.selectedUnitGenericId;
  //   product.working_code = this.selectedWorkingCode;
  //   product.remain_qty = this.selectedRemainQty;
  //   this.products.push(product);
  //   this.clearItem();
  // }
  // }

  async getTemplateItems(templateId: any) {
    // try {
    //   console.log(templateId)
    //   const rs: any = await this.requisitionService.getTemplateItems(templateId);
    //   if (rs.ok) {
    //     this.products = [];

    //     rs.rows.forEach(v => {
    //       const product: IRequisitionOrderItem = {};
    //       product.generic_id = v.generic_id;
    //       product.requisition_qty = 0;
    //       product.generic_name = v.generic_name;
    //       product.to_unit_qty = 0;
    //       product.unit_generic_id = v.unit_generic_id;
    //       product.from_unit_name = null;
    //       product.to_unit_name = null;
    //       product.qty = null;
    //       product.working_code = v.working_code;
    //       product.remain_qty = v.remain_qty;

    //       this.products.push(product);
    //     });
    //     console.log(this.products)
    //   }
    // } catch (error) {
    //   this.alertService.error(error.message);
    // }
  }

  removeItem(idx: any) {
    // this.alertService.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
    //   .then(() => {
    //     this.products.splice(idx, 1);
    //   })
    //   .catch(() => { });
  }

  async onSelectWarehouses(event: any) {
    // await this.getShipingNetwork(this.wmRequisition);
  }

  async getShipingNetwork(warehouseId: any) {
    // this.modalLoading.show();
    // this.withDrawWarehouses = [];
    // try {
    //   const rs: any = await this.wareHouseService.getShipingNetwork(warehouseId, 'REQ');
    //   this.modalLoading.hide();
    //   if (rs.ok) {
    //     this.templates = [];
    //     this.withDrawWarehouses = rs.rows;
    //     console.log(rs.rows[0]);
    //     if (rs.rows.length > 0) {
    //       this.wmWithdraw = rs.rows[0].destination_warehouse_id;
    //       this.getTemplates();
    //     }
    //   } else {
    //     this.alertService.error(rs.error);
    //   }
    // } catch (error) {
    //   this.modalLoading.hide();
    //   this.alertService.error(error.message);
    // }
  }



  async getTemplates() {
    // try {
    //   const dstWarehouseId = this.wmWithdraw;
    //   const srcWarehouseId = this.wmRequisition;

    //   if (dstWarehouseId && srcWarehouseId) {
    //     const rs: any = await this.requisitionService.getTemplates(srcWarehouseId, dstWarehouseId);

    //     if (rs.ok) {
    //       this.templates = rs.rows;
    //     } else {
    //       this.alertService.error(rs.error);
    //     }
    //   }
    // } catch (error) {
    //   this.alertService.error(error.message);
    // }
  }

  async getGenericItems(event: any) {
    // if (this.templateId) {
    //   this.getTemplateItems(this.templateId);
    // }
  }

}
