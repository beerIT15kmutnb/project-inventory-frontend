import { AlertService } from './../../alert.service';
import { Component, OnInit, Input } from '@angular/core';
import { RequisitionService } from "./../../equipment/requisition.service";
import * as _ from "lodash"
@Component({
  selector: 'app-equipment-requisition-order-detail',
  templateUrl: './equipment-requisition-order-detail.component.html',
  styleUrls: ['./equipment-requisition-order-detail.component.css']
})
export class EquipmentRequisitionOrderDetailComponent implements OnInit {
  @Input() requisitionId: any;
  loading = false;
  products = [];
  constructor(private requisitionService:RequisitionService, private alertService: AlertService) { }

  ngOnInit() { 
    this.getProductList(this.requisitionId);
  }
  async getProductList(receiveId) {
    this.loading = true;
    try {
      const rs: any = await this.requisitionService.setReqsDetail(receiveId);
      this.loading = false;
      if (rs.ok) {
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
            equipment_name: v.equipment_name
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
