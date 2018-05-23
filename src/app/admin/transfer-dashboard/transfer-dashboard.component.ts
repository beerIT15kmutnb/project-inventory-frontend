import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AlertService } from './../../alert.service';
import * as _ from 'lodash';
import { TransferDashboardService } from '../transfer-dashboard.service';
import { State } from '@clr/angular';

@Component({
  selector: 'app-transfer-dashboard',
  templateUrl: './transfer-dashboard.component.html',
  styles: []
})
export class TransferDashboardComponent implements OnInit {

  offset: number;
  currentPage = 1;
  @ViewChild('modalLoading') private modalLoading;
  @ViewChild('htmlPreview') public htmlPreview: any;
  selectedApprove = [];
  generics: any = [];
  transactions: any = [];
  histories: any = [];
  warehouses: any = [];
  perPage = 50;
  products:any
  constructor(
    private dashboardSevice: TransferDashboardService,
    private alertService: AlertService,
    @Inject('API_URL') private apiUrl: string
  ) { }

  ngOnInit() {
    
  }

  async getWarehouse() {
    // this.modalLoading.show();
    // try {
    //   const rs: any = await this.dashboardSevice.getWarehouse();
    //   if (rs.ok) {
    //     this.warehouses = rs.rows;
    //   } else {
    //     this.alertService.error(rs.error);
    //   }
    //   this.modalLoading.hide();
    // } catch (error) {
    //   this.modalLoading.hide();
    //   this.alertService.error(error.message);
    // }
  }

  async refresh(state:State){
    this.offset = +state.page.from;
    sessionStorage.setItem('currentPagedb', this.currentPage.toString());
    this.getWaiting();
  }

  async getWaiting() {
    this.modalLoading.show();
    try {
      const rs: any = await this.dashboardSevice.getTransaction(this.perPage,this.offset);
      if (rs.ok) {
        console.log(rs.rows);
        
        this.products = rs.rows[0];
      } else {
        this.alertService.error(rs.error);
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error.message);
    }
  }

  async getTransactionHistory() {
    // this.modalLoading.show();
    // try {
    //   const rs: any = await this.dashboardSevice.getTransactionHistory();
    //   if (rs.ok) {
    //     this.histories = rs.rows;
    //   } else {
    //     this.alertService.error(rs.error);
    //   }
    //   this.modalLoading.hide();
    // } catch (error) {
    //   this.modalLoading.hide();
    //   this.alertService.error(error.message);
    // }
  }

  approve() {
    // const transactionIds = [];
    // _.forEach(this.selectedApprove, (v) => {
    //   if (v.status === 'OPEN') {
    //     transactionIds.push(v.transaction_id);
    //   }
    // });
    // if (transactionIds.length) {
    //   this.alertService.confirm('คุณต้องการอนุมัติจำนวน ' + transactionIds.length + ' รายการ ใช่หรือไม่?')
    //     .then(() => {
    //       this.modalLoading.show();
    //       this.dashboardSevice.approveTransactions(transactionIds)
    //         .then((rs: any) => {
    //           if (rs.ok) {
    //             this.alertService.success();
    //             this.selectedApprove = [];
    //             this.getTransaction();
    //           } else {
    //             this.alertService.error(rs.error);
    //           }
    //           this.modalLoading.hide();
    //         })
    //         .catch((error: any) => {
    //           this.modalLoading.hide();
    //           this.alertService.serverError();
    //         })
    //     }).catch(() => { });
    // } else {
    //   this.alertService.error('ไม่พบรายการที่ต้องการอนุมัติ');
    // }
  }

  cancel(transaction: any) {
    // this.alertService.confirm(`คุณต้องการลบรายการนี้ [${transaction.transaction_code}] ใช่หรือไม่?`)
    //   .then(() => {
    //     this.modalLoading.show();
    //     this.dashboardSevice.cancelTransactions(transaction.transaction_id)
    //       .then((rs: any) => {
    //         if (rs.ok) {
    //           this.alertService.success();
    //           this.getTransaction();
    //         } else {
    //           this.alertService.error(JSON.stringify(rs.error));
    //         }
    //         this.modalLoading.hide();
    //       }).catch((error: any) => {
    //         this.modalLoading.hide();
    //         this.alertService.serverError();
    //       });
    //   })
    //   .catch(() => { });
  }
  async printRefill(h: any) {
    // const token = sessionStorage.getItem('token');
    // const url = `${this.apiUrl}/transfer-dashboard/print/transaction/${h.transaction_id}?token=${token}`;
    // this.htmlPreview.showReport(url);
  }
}
