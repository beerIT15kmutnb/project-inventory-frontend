import { AlertService } from './../../alert.service';
import { Component, OnInit, Input } from '@angular/core';
import { RequisitionService } from "./../../admin/requisition.service";
import * as _ from "lodash"
import { TransferDashboardService } from '../../admin/transfer-dashboard.service';

@Component({
  selector: 'app-addition-order-detail',
  templateUrl: './addition-order-detail.component.html',
  styleUrls: ['./addition-order-detail.component.css']
})
export class AdditionOrderDetailComponent implements OnInit {
  @Input() additionId: any;
  loading = false;
  products = [];
  constructor(    private dashboardSevice: TransferDashboardService,private requisitionService:RequisitionService, private alertService: AlertService) { }

  ngOnInit() {
    this.getProductList(this.additionId);
  }
  async getProductList(additionId) {
    this.loading = true;
    try {
      const rs: any = await this.dashboardSevice.setAddDetail(additionId);
      this.loading = false;
      console.log(rs);
      
      if (rs.ok) {
        this.products = _.map(rs.rows, (v) => {
          return {
            product_name: v.product_name,
            requisition_qty: +v.requisition_qty,
            small_unit_name: v.small_unit_name,
            generic_name: v.generic_name
          }
        })
      } else {
        console.log(rs.error);
        this.alertService.error();
      }
    } catch (error) {
      this.loading = false;
      this.alertService.error(error.message);
    }
  }
}
