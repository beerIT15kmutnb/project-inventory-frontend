import { JwtHelper } from 'angular2-jwt';
import * as _ from 'lodash';
import * as numeral from 'numeral';
import * as moment from 'moment';
import { ToThaiDatePipe } from './../../helper/to-thai-date.pipe';
import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiveService } from "../receive.service";
import { AlertService } from "../../alert.service";
import { IMyOptions } from 'mydatepicker-th';

@Component({
  selector: 'app-receive-purchase',
  templateUrl: './receive-purchase.component.html'
})
export class ReceivePurchaseComponent implements OnInit {


  @ViewChild('productSearch') public productSearch: any;
  @ViewChild('modalLoading') public modalLoading: any;



  products = [];

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  myDatePickerPurchaseOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false,
    componentDisabled: true
  };

  receiveDate: any;
  deliveryDate: any;
  deliveryCode: string;

  purchaseDate: any;

  jwtHelper: JwtHelper = new JwtHelper();

  selectedUnitId = null;
  selectedUnitName = null;
  selectedUnitEquipmentId = null;
  selectedReceiveQty: any;
  selectedCost = 0;
  conversionQty = 0;

  selectedExpiredDate = null;


  selectedProductId = null;
  selectedProductName = null;

  selectedLotNo = null;

  token = null;

  receiveCode: any;

  receiveExpired: any;
  maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  modalExpired = false;
  isComment = false;

  isItemExpired = false; // false = รับได้ true = หมดอายุ
  isExpired = false // false = กรอกวันหมดอายุ   true = ไม่กรอกวันหมดอายุ
  isReceiveHoliday = false; // false = รับได้ true = เป็นวันหยุด
  isReceivePeriod = false; // false = รับได้ true = ปิดรอบ

  searchProduct: any = {
    small_qty: null,
    small_unit_name: null,
    large_unit_name: null
  }

  constructor(
    private receiveService: ReceiveService,
    private alertService: AlertService,
    private router: Router,
    private toThaiDate: ToThaiDatePipe,
    @Inject('API_URL') private apiUrl: string,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.modalLoading.show();
    const date = new Date();
    this.receiveDate = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
    this.deliveryDate = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
    this.modalLoading.hide();
  }
  ////////////////////////////////////////


  addProduct() {
    let cehckDateformath = moment(this.selectedExpiredDate, 'DD/MM/YYYY').isValid() ? true : false;
    if (cehckDateformath) {
      let product: any = {};
      product = this.searchProduct
      product.product_id = this.selectedProductId;
      product.product_name = this.selectedProductName;
      product.receive_qty = this.selectedReceiveQty;
      product.lot_no = this.selectedLotNo ? this.selectedLotNo.toUpperCase() : null;
      product.expired_date = this.selectedExpiredDate;

      console.log(product);

      let idx = _.findIndex(this.products, { product_id: this.selectedProductId, lot_no: this.selectedLotNo, expired_date: this.selectedExpiredDate })
      if (idx > -1) {
        this.alertService.error('รายการนี้มีอยู่แล้ว กรุณาตรวจสอบ');
      } else {
        this.products.push(product);
        this.clearForm();
      }
    } else {
      this.alertService.error('รูปแบบวันที่ผิดพลาด');
    }
  }

  async saveReceive() {
    if (this.receiveDate) {
      // const _receiveDate = this.receiveDate ?`${this.receiveDate.date.year}-${this.receiveDate.date.month}-${this.receiveDate.date.day}` : null;
      // console.log(_receiveDate);
      this.saveReceiveTo();
    } else {
      this.alertService.error('กรุณาระบุวันที่รับ');
    }
  }

  saveReceiveTo() {
    if (!this.receiveDate || !this.deliveryDate || !this.deliveryCode) {
      this.alertService.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      this.modalLoading.hide();
    } else {
      const _receiveDate = this.receiveDate ?
        `${this.receiveDate.date.year}-${this.receiveDate.date.month}-${this.receiveDate.date.day}` : null;
      const _deliveryDate = this.deliveryDate ?
        `${this.deliveryDate.date.year}-${this.deliveryDate.date.month}-${this.deliveryDate.date.day}` : null;
      // const _purchaseDate = this.purchaseDate ?
      // `${this.purchaseDate.date.year}-${this.purchaseDate.date.month}-${this.purchaseDate.date.day}` : null;

      this.modalLoading.show();
      this.alertService.confirm('ต้องการบันทึกข้อมูลการรับอุปกรณ์สำนักงาน ใช่หรือไม่?')
        .then(() => {
          try {
            const summary = {
              receiveDate: _receiveDate,
              receiveCode: this.receiveCode,
              deliveryCode: this.deliveryCode,
              deliveryDate: _deliveryDate,
            }
            const _products = [];
            // let isErrorWarehouse = false;
            this.products.forEach((v: any) => {
              if (v.receive_qty > 0) {
                _products.push(v);
              }
            });
            console.log(_products, summary);
            this.receiveService.saveReceive(summary, _products)
              .then((res: any) => {
                this.modalLoading.hide();
                if (res.ok) {
                  this.alertService.success()
                  this.router.navigate(['/equipment/receives']);
                } else {
                  this.alertService.error(res.error);
                }
              }).catch(error => {

                this.alertService.error(error.message);
                this.modalLoading.hide();
              });
          } catch (error) {
            this.modalLoading.hide();
            this.alertService.error(error.message);
          }
        }).catch(() => {
          this.modalLoading.hide();
        });
    }
  }
  ////////////////////////////////////////




  clearProductSearch() {
    this.selectedProductId = null;
    this.conversionQty = 0;
    this.selectedReceiveQty = '';
  }

  changeUnit(event: any) {
    try {
      this.selectedUnitName = event.unit_name;
      this.selectedUnitId = event.unit_id;
      this.conversionQty = event.qty;
      this.selectedUnitEquipmentId = event.unit_equipment_id;
      this.selectedCost = event.cost
    } catch (error) {
      //
    }
  }

  setSelectedProduct(event: any) {
    try {
      console.log(event);
      this.searchProduct = event
      this.selectedProductId = event ? event.product_id : null;
      this.selectedProductName = event ? `${event.product_name}` : null;
    } catch (error) {
      console.log(error.message);
    }
  }


  clearForm() {
    this.searchProduct = {
      product_name: null,
      small_qty: null,
      small_unit_name: null,
      large_unit_name: null
    }
    this.selectedProductId = null;
    this.selectedProductName = null;
    this.selectedExpiredDate = null;
    this.selectedLotNo = null;
    this.selectedReceiveQty = '';
    this.productSearch.clearProductSearch();
  }

  removeSelectedProduct(idx: any) {
    this.alertService.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
      .then(() => {
        this.products.splice(idx, 1);
      })
      .catch(() => {
      });
  }

  editChangeLot(idx: any, lot: any) {
    try {
      this.products[idx].lot_no = lot;
    } catch (error) {

    }
  }

  editChangeExpired(idx: any, expired: any) {
    this.products[idx].expired_date = expired;
  }






  changeSearchProduct(event) {
    if (event) {
      this.productSearch.clearProductSearch();
      this.clearForm();
    }
  }

  async checkExpired() {
    //   this.isExpired = false;
    //   this.isItemExpired = false;
    //   if (this.receiveExpired) {
    //     for (const v of this.products) {
    //       if (!moment(v.expired_date, 'DD-MM-YYYY').isValid()) {
    //         this.alertService.error('กรุณาระบุวันหมดอายุ');
    //         console.log('err กรุณาระบุวันหมดอายุ');
    //         this.isExpired = true;
    //       }
    //     }
    //   }
    // //   // console.log(this.isExpired);
    //   if (!this.isExpired) {
    //     let count = 0;
    //     for (const v of this.products) {
    //       if (!moment(v.expired_date, 'DD-MM-YYYY').isValid()) {
    //         const d: any = v.expired_date.split('/');
    //         const expired_date: any = new Date(d[2], d[1] - 1, d[0]);
    //         const diffday = moment(expired_date).diff(moment(), 'days');
    //         // console.log(diffday, expired_date);

    //         if (diffday < 0) {
    //           count++;
    //         }
    //       }
    //     }
    //     if (count > 0) {
    //       this.alertService.error('มีเวชภัณฑ์หมดอายุ ไม่อนุญาตให้รับอุปกรณ์สำนักงาน');
    //       console.log('เวชภัณฑ์หมดอายุ');
    //       this.isItemExpired = true;
    //     }
    //   }
    //   // console.log(this.isItemExpired);
    //   if (!this.isItemExpired) {
    //     let checkDiffExpired;
    //     let count = 0;
    //     for (const v of this.products) {
    //       if (!moment(v.expired_date, 'DD-MM-YYYY').isValid()) {
    //         const d: any = v.expired_date.split('/');
    //         const expired_date = moment(new Date(d[2], d[1] - 1, d[0])).format('YYYY-MM-DD');
    //         checkDiffExpired = await this.receiveService.getPurchaseCheckExpire(v.equipment_id, expired_date);
    //         // console.log(checkDiffExpired);
    //         if (!checkDiffExpired.ok) {
    //           count++;
    //         }
    //       }
    //     }
    //     if (count > 0) {
    //       console.log('err ใกล้หมดอายุ');
    //       this.alertService.confirm(checkDiffExpired.error)
    //         .then(() => {
    //           this.isItemExpired = false; // ใช่ ดำเนินการ
    //           this.modalExpired = true;
    //           this.isComment = true;
    //         })
    //         .catch(() => {
    //           this.isItemExpired = true;
    //         })
    //     } else {
    //       if (!this.isExpired && !this.isItemExpired && !this.isReceiveHoliday && !this.isReceivePeriod) {
    //         // console.log('all false');
    //         this.saveReceiveTo();
    //       }
    //     }

    // } // expired
  }
}
