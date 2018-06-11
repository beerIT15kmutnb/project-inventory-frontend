import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AlertService } from './../../alert.service';
import { IssueService } from './../../equipment/issue.service';

@Component({
  selector: 'wm-equipment-transection-issue-detail',
  templateUrl: './equipment-transection-issue-detail.component.html',
  styleUrls: ['./equipment-transection-issue-detail.component.css']
})
export class EquipmentTransectionIssuedetailComponent implements OnInit {
  @Input() issueId: any; 
  loading = false;
  products = [];

  constructor(
    private issueService: IssueService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getProductList();
  }

  async getProductList() {
    this.loading = true;
    try {
      const rs = await this.issueService.listDetail(this.issueId)
      if (rs.ok) {
        this.products = rs.rows[0];
        console.log(this.products);
        
      } else {
        this.alertService.error('เกิดข้อผิดพลาด: ' + JSON.stringify(rs.error));
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error.message); 
    }
  }

}
