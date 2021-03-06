import { Component, OnInit, ViewChild, Inject, NgZone } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { ToThaiDatePipe } from '../../helper/to-thai-date.pipe';
import { AlertService } from '../../alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
// import { PeriodService } from '../../period.service';

import * as _ from 'lodash';

import * as moment from 'moment';
import { ProductsService } from '../products.service';
// import { BasicService } from 'app/basic.service';
import { IssueService } from '../issue.service';
// import { SettingService } from '../../setting.service';
// import { UploadingService } from 'app/uploading.service';

@Component({
  selector: 'wm-issues-edit',
  templateUrl: './issues-edit.component.html',
  styles: []
})
export class IssuesEditComponent implements OnInit {
  issueId: any;
  selectedProductName: string;
  selectedProductId: any;
  products = [];
  issueDate = null;
  transectionId: null;
  issues: any = [];
  comment: any = null;
  remainQty = 0;
  isSaving = false;
  lots: any = [];
  objProduct: any = [];
  hlistIssues: any;

  primaryUnitId: null;
  primaryUnitName: null;

  productId: any = null;
  productName: any = null;
  equipmentId: any;

  issueQty: any = 0;
  expiredDate: any = null;
  lotNo: any;
  conversionQty = 0;
  unitEquipmentId: null;

  warehouseId: any;
  warehouseName: any;
  refDocument: any;
  openHistory = false;
  equipmentName: any;
  isApprove: any;

  openUpload = false;
  filePath: string;
  fileName: any = null;
  file: any;

  isImport = false;

  isOpenModal = false;
  reserveQty;
  searchProduct: any = {
    small_qty: null,
    small_unit_name: null,
    large_unit_name: null
  };
  // @ViewChild('unitList') public unitList: any;
  // @ViewChild('lotModal') public lotModal: any;
  // @ViewChild('lotList') public lotList: any;
  @ViewChild('productSearch') public productSearch: any;
  // @ViewChild('warehouseList') public warehouseList: any;
  @ViewChild('modalLoading') public modalLoading: any;
  // @ViewChild('data') public data: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  token: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private toThaiDate: ToThaiDatePipe,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    // private basicService: BasicService,
    private issueService: IssueService,
    // private uploadingService: UploadingService,
    @Inject('API_URL') private apiUrl: string,
    private zone: NgZone,
    // private periodService: PeriodService,
    // private settingService: SettingService
  ) {
    this.token = sessionStorage.getItem('token');
    const decodedToken: any = this.jwtHelper.decodeToken(this.token);
    this.warehouseId = decodedToken.warehouseId;
  }

  ngOnInit() {
    const date = new Date();

    this.issueDate = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
    this.route.queryParams
      // .filter(params => params.order)
      .subscribe(params => {
        this.issueId = params.issueId;
      });

    this.gettransectionaIssues();
    this.setIssues();
    this.setIssueDetail()

  }
  async setIssueDetail() {
    try {
      let rs = await this.issueService.setIssueDetail(this.issueId)
      if (rs.ok) {
        console.log(rs.rows[0]);

        this.products = _.map(rs.rows[0], (v) => {
          return {
            issue_product_id: v.issue_product_id,
            product_name: v.product_name,
            issue_qty: +v.qty,
            product_id: v.product_id,
            remain_qty: v.remainQty,
            large_unit_name: v.lm,
            small_qty: +v.small_qty,
            small_unit_name: v.sm
          }
        })
        for (let v of this.products) {
          let rss = await this.issueService.setIssueProductDetail(v.issue_product_id)
          if (rss.ok) {
            console.log(rss.rows[0]);

            v.items = _.map(rss.rows[0], (e) => {
              return {
                issue_product_id: e.issue_product_id,
                product_id: e.product_id,
                lot_no: e.lot_no,
                qty: e.qty,
                wm_product_id: e.wm_product_id,
                remainQty :e.remainQty,
                remainQtyB: e.remainQtyB,
                expired_date: e.expired_date
              }
            })
          }
        }

      } else {
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }
  }
  async setIssues() {
    try {
      let rs = await this.issueService.setIssues(this.issueId)
      if (rs.ok && rs.rows[0]) {
        let res = rs.rows[0]
        this.issueDate = {
          date: {
            year: moment(res.issue_date).get('year'),
            month: moment(res.issue_date).get('month') + 1,
            day: moment(res.issue_date).get('date')
          }
        };
        this.transectionId = res.transection_issue_id;
        this.comment = res.comment
      } else {
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }

  }

  async gettransectionaIssues() {
    const rs = await this.issueService.gettransectionIssues();
    console.log(rs.rows);
    this.issues = rs.rows;
  }

  onEditChangeLots(event: any, idx: any) {
    // console.log(event);
    // this.products[idx].lot_no = event.lot_no;
    // this.products[idx].expired_date = event.expired_date;
    // this.products[idx].unit_equipment_id = event.unit_equipment_id;
    // this.products[idx].remain_qty = event.qty;
    // this.products[idx].conversion_qty = event.conversion_qty;
  }
  changeSearchProduct(event) {
    if (event) {
      this.productSearch.clearProductSearch();
      this.clearForm();
    }
  }
  async setSelectedProduct(event: any) {
    try {
      console.log(event);
      this.searchProduct = event;
      this.selectedProductId = event ? event.product_id : null;
      if (this.selectedProductId) {
        console.log(this.selectedProductId);

        const rs = await this.productService.getProductRemain(this.selectedProductId)
        console.log(rs.data);

        this.remainQty = rs.data[0].qty
      }
      //   this.selectedEquipmentId = event ? event.equipment_id : null;
      this.selectedProductName = event ? `${event.product_name}` : null;
      //   this.selectedEquipmentName = event ? `${event.equipment_name}` : null;
      // this.selectedExpireNumDays = event ? event.expire_num_days : 0;

      //   this.manufactureList.getManufacture(this.selectedEquipmentId);
      //   this.warehouseList.getWarehouses(this.selectedEquipmentId);

      // this.primaryUnitId = event ? event.primary_unit_id : null;
      // this.primaryUnitName = event ? event.primary_unit_name : null;
      //   this.unitList.setEquipmentId(this.selectedEquipmentId);

      //   // lot control
      //   this.isLotControl = event ? event.is_lot_control : null;

    } catch (error) {
      console.log(error.message);
    }
  }

  async changeUnit(event: any) {
    // try {
    //   this.conversionQty = event.qty ? event.qty : 0;
    //   this.unitEquipmentId = event.unit_equipment_id ? event.unit_equipment_id : null;
    // } catch (error) {
    // }
  }
  changeLots(event: any) {
    // try {
    //   const idx = _.findIndex(this.lots, { lot_no: this.lotNo });
    //   if (idx > -1) {
    //     this.expiredDate = this.lots[idx].expired_date;
    //     this.remainQty = this.lots[idx].qty;
    //   }
    // } catch (error) {
    // }
  }

  clearProductSearch() {
    // this.productId = null;
  }

  async getLots() {
    // try {
    //   const rs = await this.issueService.getLots(this.productId, this.warehouseId);
    //   this.lots = rs.rows;
    //   this.remainQty = _.sumBy(this.lots, 'qty');
    //   console.log(this.lots);
    //   console.log(this.remainQty);

    // } catch (error) {
    //   console.error(error);
    // }
  }

  async addProduct() {

    const idx = _.findIndex(this.products, { product_id: this.selectedProductId });
    if (idx > -1) {
      this.alertService.success('รายการซ้ำ', 'จำนวนจะไปเพิ่มในรายการเดิม');
      const newQty = +this.products[idx].issue_qty + +this.issueQty;
      if (newQty > +this.products[idx].remain_qty) {
        this.products[idx].issue_qty = this.products[idx].remain_qty;
      } else {
        this.products[idx].issue_qty = newQty;
      }
      // await this.alowcate(this.equipmentId);
    } else {

      if (this.remainQty < this.issueQty) {
        this.alertService.error('จำนวนจ่าย มากกว่าจำนวน คงเหลือ');
      } else {
        const obj: any = {};
        obj.issue_qty = +this.issueQty;
        obj.product_id = this.selectedProductId;
        obj.product_name = this.selectedProductName;
        obj.remain_qty = +this.remainQty;
        obj.large_unit_name = this.searchProduct.large_unit_name
        obj.small_qty = this.searchProduct.small_qty
        obj.small_unit_name = this.searchProduct.small_unit_name
        // obj.warehouse_id = this.warehouseId;

        obj.items = [];
        this.products.push(obj);
        await this.alowcate(this.selectedProductId);
        // console.log(this.products);
        // await this.alowcate(this.equipmentId);
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
        // }
        if (this.products) {
          let idx = _.findIndex(this.products, { product_id: productId })
          let _data = {};
          console.log(list);
          let issue_qty = this.products[idx].issue_qty
          if (idx > -1) {
            _.forEach(list, (v) => {
              if (v.remainQty > 0)
                if (v.remainQty >= issue_qty) {
                  v.qty = issue_qty
                  v.remainQtyB = v.remainQty - issue_qty
                } else {
                  v.qty = v.remainQty
                  v.remainQtyB = v.remainQty - v.qty
                }
                issue_qty = issue_qty - v.qty

            })
            console.log(list);
            this.products[idx].items = list;
            //   _data = {
            //     equipmentId: this.products[idx].product_id,
            //     unitEquipmentId: this.products[idx].unit_equipment_id,
            //     equipmentQty: this.products[idx].issue_qty * this.products[idx].conversion_qty
            //   };
          }

          //     const data_ = [];
          //     data_.push(_data);

          //     const result: any = await this.issueService.getIssuesProduct(data_);
          //     if (result.ok) {
          //       const list = result.rows;
          //       list.forEach(v => {
          //         v.unit_equipment_id = this.products[idx].unit_equipment_id
          //       });
          //       idx = _.findIndex(this.products, { equipment_id: equipmentId })
          //       if (idx > -1) {
          //         this.products[idx].items = list;
          //       }
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error.message);
    }
  }
  editChangeIssueQty(idx: any, qty: any) {
    // // const oldQty = +this.products[idx].issue_qty;
    // console.log(this.products);

    if ((+qty.value) > +this.products[idx].remain_qty) {
      this.alertService.error('จำนวนจ่าย มากกว่าจำนวนคงเหลือ');
      this.products[idx].issue_qty = '';
    } else {
      this.products[idx].issue_qty = +qty.value;
      // this.alowcate(this.products[idx].equipment_id);
    }
  }

  async editChangeUnit(idx: any, event: any, unitCmp: any) {
    // if (this.products[idx].remain_qty < (this.products[idx].issue_qty * event.qty)) {
    //   this.products[idx].issue_qty = 0;
    //   this.products[idx].unit_equipment_id = event.unit_equipment_id;
    //   this.products[idx].conversion_qty = event.qty;
    //   unitCmp.getUnits(this.products[idx].equipment_id);
    // } else {
    //   this.products[idx].unit_equipment_id = event.unit_equipment_id;
    //   this.products[idx].conversion_qty = event.qty;
    //   await this.alowcate(event.equipment_id);
    //   console.log(this.products);

    // }
  }

  removeSelectedProduct(idx: any) {
    this.alertService.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
      .then(() => {
        this.products.splice(idx, 1);
      }).catch(() => { });
  }

  clearForm() {
    this.remainQty = 0;
    this.issueQty = '';
    // this.lotNo = null;
    this.selectedProductId = null;
    // this.equipmentId = null;
    this.selectedProductName = null;
    // // this.primaryUnitId = null;
    // // this.primaryUnitName = null;
    // this.expiredDate = null;
    this.searchProduct = {
      small_qty: null,
      small_unit_name: null,
      large_unit_name: null
    };
    // this.conversionQty = 0;
    // this.reserveQty = 0;
    // this.unitList.clearUnits();
    // this.lots = [];
    this.productSearch.clearProductSearch();
  }

  async saveIssue() {
    const issueDate = this.issueDate ? `${this.issueDate.date.year}-${this.issueDate.date.month}-${this.issueDate.date.day}` : null;
    this.alertService.confirm('ต้องการบันทึกรายการ ตัดจ่าย ใช่หรือไม่?')
      .then(() => {
        this.modalLoading.show();
        const summary: any = {};
        summary.issueDate = this.issueDate ? `${this.issueDate.date.year}-${this.issueDate.date.month}-${this.issueDate.date.day}` : null;
        summary.transectionId = this.transectionId;
        summary.comment = this.comment;
        //       summary.refDocument = this.refDocument;

        //       // check product remain
        let isError = false;
        this.products.forEach(v => {
          const totalIssue = v.issue_qty;
          if (totalIssue > v.remain_qty || v.issue_qty <= 0) {
            isError = true;
          }
        });

        if (isError) {
          this.alertService.error('มีจำนวนที่มียอดจ่ายมากกว่ายอดคงเหลือ หรือ ไม่ได้ระบุจำนวนจ่าย');
          this.modalLoading.hide();
        } else {
          this.issueService.updateIssue(this.issueId, summary, this.products)
            .then((results: any) => {
              if (results.ok) {
                this.alertService.success();
                this.router.navigate(['/equipment/issues']);
              } else {
                this.alertService.error(results.error);
              }
              this.modalLoading.hide();
            })
            .catch((error: any) => {
              this.modalLoading.hide();
              this.alertService.error(error.message);
            });
        }

      }).catch(() => {
        this.modalLoading.hide();
      });
    // }
  }

  openModal() {
    // this.isOpenModal = true;
    // this.getIssues();
  }

  async getIssues() {
    // try {
    //   const res = await this.issueService._getIssues(this.warehouseId)
    //   if (res.ok) {
    //     this.hlistIssues = res.rows;
    //   } else {
    //     this.alertService.error(res.error);
    //   }
    //   this.modalLoading.hide();
    // } catch (error) {
    //   this.modalLoading.hide();
    //   this.alertService.error(error.message);
    // }
  }

  async addIssue(id: any) {
    // this.products = []
    // this.isOpenModal = false;
    // try {
    //   const res = await this.issueService.getEquipmentList(id)
    //   if (res.ok) {
    //     this.objProduct = res.rows;
    //     for (const v of this.objProduct) {
    //       const obj: any = {};
    //       obj.issue_qty = 0;
    //       obj.equipment_id = v.equipment_id;
    //       obj.equipment_name = v.equipment_name;
    //       obj.remain_qty = +v.remain_qty;
    //       obj.conversion_qty = +v.conversion_qty;
    //       obj.unit_equipment_id = v.unit_equipment_id;
    //       obj.warehouse_id = this.warehouseId;
    //       this.products.push(obj);
    //       await this.alowcate(v.equipment_id);
    //     }
    //   } else {
    //     this.alertService.error(res.error);
    //   }
    //   this.modalLoading.hide();
    // } catch (error) {
    //   this.modalLoading.hide();
    //   this.alertService.error(error.message);
    // }
  }

  // file upload
  showUploadModal() {
    // this.openUpload = true;
  }

  fileChangeEvent(fileInput: any) {
    // this.file = <Array<File>>fileInput.target.files;
    // this.fileName = this.file[0].name;
  }

  async doUpload() {
    // this.isImport = true;
    // try {
    //   this.modalLoading.show();
    //   const rs: any = await this.uploadingService.uploadIssuetransection(this.file[0]);
    //   this.modalLoading.hide();
    //   // clear products
    //   this.products = [];

    //   if (rs.ok) {
    //     const data = [];
    //     rs.rows.forEach(v => {
    //       if (v.issue_qty > 0) {
    //         const obj: any = {};
    //         obj.issue_qty = v.issue_qty;
    //         obj.equipment_id = v.equipment_id;
    //         obj.equipment_name = v.equipment_name;
    //         obj.remain_qty = +v.remain_qty;
    //         obj.conversion_qty = 1;
    //         obj.unit_equipment_id = null;
    //         obj.warehouse_id = this.warehouseId;
    //         obj.unit_name = v.unit_name;
    //         obj.items = [];
    //         this.products.push(obj);

    //         data.push({
    //           equipmentId: v.equipment_id,
    //           equipmentQty: v.issue_qty
    //         });
    //       }
    //     });

    //     this.getAllowcateData(data);

    //     this.openUpload = false;
    //   } else {
    //     this.alertService.error(JSON.stringify(rs.error));
    //   }

    // } catch (error) {
    //   this.modalLoading.hide();
    //   this.alertService.error(JSON.stringify(error));
    // }
  }

  async getAllowcateData(data) {
    // this.modalLoading.show();
    // const result: any = await this.issueService.getIssuesProduct(data);
    // if (result.ok) {
    //   const list = result.rows;
    //   this.products.forEach((v, i) => {
    //     const idx = _.findIndex(list, { equipment_id: v.equipment_id });
    //     if (idx > -1) {
    //       this.products[i].items.push(list[idx]);
    //     }
    //   });
    //   this.modalLoading.hide();
    // } else {
    //   this.modalLoading.hide();
    //   console.log(result.error);
    //   this.alertService.error();
    // }
  }

  setSelectedEquipment(e) {
    this.products.push(e);
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
      this.products[idx].issue_qty = total_base;
    }
    console.log(idx);
    console.log(this.products);
    console.log(this.products[idx]);
    
  }
}
