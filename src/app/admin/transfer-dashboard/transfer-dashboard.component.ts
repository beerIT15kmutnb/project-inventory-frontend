import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AlertService } from './../../alert.service';
import * as _ from 'lodash';
import { TransferDashboardService } from '../transfer-dashboard.service';
import { State } from '@clr/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-dashboard',
  templateUrl: './transfer-dashboard.component.html',
  styles: []
})
export class TransferDashboardComponent implements OnInit {

  [x: string]: any;
  offset: number;
  currentPage = 1;
  @ViewChild('modalLoading') private modalLoading;
  @ViewChild('htmlPreview') public htmlPreview: any;
  selectedApprove = [];
  generics: any = [];
  transections: any = [];
  orders = []
  histories: any = [];
  warehouses: any = [];
  perPage = 50;
  selectedAddition = []
  products: any
  constructor(
    private dashboardSevice: TransferDashboardService,
    private alertService: AlertService,
    private router: Router,
    @Inject('API_URL') private apiUrl: string
  ) { }

  ngOnInit() {
  }
  addition() {
    this.router.navigate(['/admin/addition'], { queryParams: { generics: JSON.stringify(this.selectedApprove) } });
    // routerLink="/admin/addition" [queryParams]="{generics: selectedApprove}"
  }
  async refreshList(state: State) {
    this.offset = +state.page.from;
    sessionStorage.setItem('additionPagedb', this.currentPage.toString());
    this.getWaitingList();
  }
  async getWaitingList() {
    this.modalLoading.show();
    try {
      const rs: any = await this.dashboardSevice.getWaitingList(this.perPage, this.offset);
      if (rs.ok) {
        console.log(rs.rows);

        this.orders = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error.message);
    }
  }
  async refresh(state: State) {
    this.offset = +state.page.from;
    sessionStorage.setItem('currentPagedb', this.currentPage.toString());
    this.getWaiting();
  }

  async getWaiting() {
    this.modalLoading.show();
    try {
      const rs: any = await this.dashboardSevice.gettransection(this.perPage, this.offset);
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

}
