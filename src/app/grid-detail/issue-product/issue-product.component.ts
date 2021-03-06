import { AlertService } from './../../alert.service';
import { ReceiveService } from './../../admin/receive.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IssueService } from '../../admin/issue.service';

@Component({
  selector: 'wm-issue-product',
  templateUrl: './issue-product.component.html'
})
export class IssueProductComponent implements OnInit {

  loading = false;
  list = [];
  items: any = [];

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  @Input('data')
  set setData(value: any) {
    console.log(value);
    
    this.items = value;
  }
  constructor(private issueService: IssueService, private alertService: AlertService) { }

  ngOnInit() { }

  async onChangeQty(qty, idx) {
    if ((+qty.value) > +this.items[idx].remainQty) {
      this.alertService.error('จำนวนตัดจ่าย มากว่าจำนวนคงเหลือ');
      console.log(this.items[idx].remainQty);
      this.items[idx].remainQtyB = 0
      this.items[idx].qty = this.items[idx].remainQty
      this.onChange.emit(this.items);
    } else { 
      this.items[idx].remainQtyB = +this.items[idx].remainQty - +qty.value
      this.items[idx].qty = +qty.value;
      this.onChange.emit(this.items);
    }
  }
  editChangeUnit(idx: any, event: any, unitCmp: any) {
    // if ((+qty.value * this.items[idx].conversion_qty) > +this.items[idx].small_remain_qty) {
    //   this.alertService.error('จำนวนตัดจ่าย มากว่าจำนวนคงเหลือ');
    //   unitCmp.getUnits(this.items[idx].generic_id);
    //   unitCmp.setSelectedUnit(this.items[idx].unit_generic_id);
    // } else {
    //   this.items[idx].unit_generic_id = event.unit_generic_id;
    //   this.items[idx].conversion_qty = event.qty;
    // }
    // this.items[idx].unit_generic_id = event.unit_generic_id;
    this.items[idx].conversion_qty = event.qty;
  }

}