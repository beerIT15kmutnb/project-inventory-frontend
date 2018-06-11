import { AlertService } from './../../alert.service';
import { ReceiveService } from './../../equipment/receive.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wm-equipment-product-detail',
  templateUrl: './equipment-product-detail.component.html'
})
export class EquipmentProductDetailComponent implements OnInit {
  @Input() receiveId: any;
  loading = false;
  products = [];

  constructor(private receiveService: ReceiveService, private alertService: AlertService) { }

  ngOnInit() { 
    this.getProductList(this.receiveId);
  }

  async getProductList(receiveId) {
    this.loading = true;
    try {
      const result: any = await this.receiveService.getReceiveProducts(receiveId);
      this.loading = false;
      if (result.ok) {
        this.products = result.rows[0];
      } else {
        console.log(result.error);
        this.alertService.error();
      }
    } catch (error) {
      this.loading = false;
      this.alertService.error(error.message);
    }
  }

}
