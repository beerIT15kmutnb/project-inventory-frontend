import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AlertExpiredService } from '../alert-expired.service';
import { AlertService } from '../../alert.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-alert-expired',
  templateUrl: './alert-expired.component.html'
})
export class AlertExpiredComponent implements OnInit {
  @ViewChild('modalLoading') public modalLoading: any;

  allEquipments: Array<any> = [];
  selectedEquipments: Array<any> = [];
  selectedEquipmentIds: Array<any> = [];
  numDays = 10;
  isAll = true;
  isAlert = false;
  openSetSingleExpire = false;
  submitLoading = false;
  equipmentTypes = [];
  equipmentType: any = "";
  products = [];

  constructor(
    private alertExpiredService: AlertExpiredService,
    private alertService: AlertService,
    // private ref: ChangeDetectorRef,
    private productService: ProductsService,
  ) { }

  ngOnInit() {
    this.getAllProducts();
    // this.getStatus();
    // this.getEquipmentType();
    this.getProductExpired();
  }

  getStatus() {
    // this.modalLoading.show();
    // this.alertExpiredService.getStatus()
    //   .then((result: any) => {
    //     if (result.ok) {
    //       if (result.status === 'Y') {
    //         this.isAlert = true;
    //       } else {
    //         this.isAlert = false;
    //       }
    //     } else {
    //       this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(result.error));
    //     }
    //     this.modalLoading.hide();
    //   })
    //   .catch(() => {
    //     this.modalLoading.hide();
    //     this.alertService.serverError();
    //   });
  }

  async getProductExpired() {
    this.modalLoading.show();
    try {
      const rs: any = await this.alertExpiredService.getProductExpired();
      console.log(rs);
      
      if (rs.ok) {
        this.products = rs.data[0];
      } else {
        this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(rs.error));
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error);
    }
  }
  setAlertStatus() {
    // if (this.isAlert) {
    //   this.isAlert = false;
    // } else {
    //   this.isAlert = true;
    // }

    // const status = this.isAlert ? 'Y' : 'N';
    // this.modalLoading.show();
    // this.alertExpiredService.saveStatus(status)
    //   .then((result: any) => {
    //     if (result.ok) {
    //       this.alertService.success();
    //     } else {
    //       this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(result.error));
    //     }
    //     this.modalLoading.hide();
    //   })
    //   .catch(() => {
    //     this.modalLoading.hide();
    //     this.alertService.serverError();
    //   });
  }

  async getAllProducts() {
    this.isAll = true;
    this.modalLoading.show();
    try {
      let rs: any = await this.alertExpiredService.getAllProducts();
      if (rs.ok) {
        this.allEquipments = rs.data;
      } else {
        this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(rs.error));
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error);
    }
  }

  async changeEquipmentType() {
    // this.isAll = true;
    // this.modalLoading.show();
    // if (this.equipmentType == 'all') this.getAllProducts()
    // else {
    //   try {
    //     let rs: any = await this.alertExpiredService.getSelectEquipments(this.equipmentType);
    //     if (rs.ok) {
    //       this.allEquipments = rs.rows;
    //     } else {
    //       this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(rs.error));
    //     }
    //     this.modalLoading.hide();
    //   } catch (error) {
    //     this.modalLoading.hide();
    //     this.alertService.serverError();
    //   }
    // }

  }

  async getEquipmentType() {
    // try {
    //   this.modalLoading.show();
    //   const rs = await this.productService.getEquipmentType();

    //   if (rs.ok) {
    //     this.equipmentTypes = rs.rows;
    //     this.equipmentType = 'all';
    //   } else {
    //     this.alertService.error(rs.error);
    //   }

    //   this.modalLoading.hide();
    // } catch (error) {
    //   this.modalLoading.hide();
    //   console.log(error);
    //   this.alertService.serverError();
    // }
    // console.log(this.equipmentTypes);

  }

  setExpireCount() {
    try {
      // clear old data
      this.selectedEquipmentIds = [];
      this.selectedEquipments.forEach((v: any) => {
        this.selectedEquipmentIds.push(v.equipment_id);
      });
      this.openSetSingleExpire = true;
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }

  setSingleExpire(product: any) {
    // clear old data
    this.selectedEquipmentIds = [];
    this.selectedEquipmentIds.push(product.equipment_id);
    this.openSetSingleExpire = true;
  }

  saveExpireCount() {
    if (this.numDays >= 10) {
      this.submitLoading = true;
      this.alertExpiredService.saveExpiredCount(this.selectedEquipmentIds, this.numDays)
        .then((result: any) => {
          if (result.ok) {
            this.openSetSingleExpire = false;
            this.getAllProducts();
            this.alertService.success()
          } else {

            this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(result.error));
          }
          this.submitLoading = false;
        })
        .catch(() => {
          this.submitLoading = false;
          this.alertService.serverError();
        });
    } else {
      this.submitLoading = false;
      this.alertService.error('ควรกำหนดวันที่แจ้งเตือนอย่างน้อย 10 วันขึ้นไป');
    }
  }

  getUnsetProducts() {
    this.isAll = false;
    this.modalLoading.show();
    this.alertExpiredService.getUnsetProducts()
      .then((result: any) => {
        if (result.ok) {
          this.allEquipments = result.data;
          console.log(result);
          
        } else {
          this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(result.error));
        }
        this.modalLoading.hide();
        // this.ref.detectChanges();
      })
      .catch(() => {
        this.modalLoading.hide();
        this.alertService.serverError();
      });
  }
}
