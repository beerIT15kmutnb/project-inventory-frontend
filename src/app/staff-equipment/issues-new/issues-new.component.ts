import { Component, OnInit, ViewChild, Inject, NgZone } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { ToThaiDatePipe } from '../../helper/to-thai-date.pipe';
import { AlertService } from '../../alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import * as _ from 'lodash';

import { ProductsService } from '../products.service';
import { IssueService } from '../issue.service';

@Component({
  selector: 'wm-issues-new',
  templateUrl: './issues-new.component.html',
  styles: []
})
export class IssuesNewComponent implements OnInit {
  selectedProductName: string;
  selectedProductId: any;
  products = [];
  issueDate = null;
  transectionId: null;
  issues: any = [];
  comment: any = null;
  remainQty = 0;

  productId: any = null;
  productName: any = null;

  issueQty: any = 0;
  searchProduct: any = {
    small_qty: null,
    small_unit_name: null,
    large_unit_name: null
  };
  @ViewChild('productSearch') public productSearch: any;
  @ViewChild('modalLoading') public modalLoading: any;

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
    private issueService: IssueService,
    @Inject('API_URL') private apiUrl: string,
    private zone: NgZone,
  ) {
    this.token = sessionStorage.getItem('token');
    const decodedToken: any = this.jwtHelper.decodeToken(this.token);
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

    this.gettransectionaIssues();
  }

  async gettransectionaIssues() {
    const rs = await this.issueService.gettransectionIssues();
    this.issues = rs.rows;
  }

  changeSearchProduct(event) {
    if (event) {
      this.productSearch.clearProductSearch();
      this.clearForm();
    }
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
  }


  clearProductSearch() {
    this.selectedProductId = null;
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

  editChangeIssueQty(idx: any, qty: any) {
    if ((+qty.value) > +this.products[idx].remain_qty) {
      this.alertService.error('จำนวนจ่าย มากกว่าจำนวนคงเหลือ');
      this.products[idx].issue_qty = '';
    } else {
      this.products[idx].issue_qty = +qty.value;
    }
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
    this.selectedProductId = null;
    this.selectedProductName = null;
    this.searchProduct = {
      small_qty: null,
      small_unit_name: null,
      large_unit_name: null
    };
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
          this.issueService.saveIssue(summary, this.products)
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
