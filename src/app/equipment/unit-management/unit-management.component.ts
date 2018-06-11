import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AlertService } from "../../alert.service";
import { ProductsService } from "../products.service"
@Component({
  selector: 'app-unit-management',
  templateUrl: './unit-management.component.html',
  styleUrls: ['./unit-management.component.css']
})
export class UnitManagementComponent implements OnInit {
  @ViewChild('modalLoading') public modalLoading: any;
  items: any = []
  units: any = []
  openModal = false
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private alertService: AlertService,
    private productsService: ProductsService
  ) {
    // private 
  }
  ngOnInit() {
    this.getUnit()
  }
  async edit(item: any) {
    this.items = item
    this.openModal = true
   
  }
  async saveEdit(){
    console.log(this.items);
    let rs:any = await this.productsService.editUnit(this.items)
    if(rs.ok){
      this.openModal = false
      this.items = []
      this.alertService.success()
      this.getUnit()
    } else {
      this.alertService.error(rs.error)
    }
  }
  async saveAdd(){
    console.log(this.items);
    let rs:any = await this.productsService.addUnit(this.items)
    if(rs.ok){
      this.openModal = false
      this.items = []
      this.alertService.success()
      this.getUnit()
    } else {
      this.alertService.error(rs.error)
    }
  }
  async add() {
    this.openModal = true
    this.items = {
      unit_name: '',
      is_active: 'Y'
    }
  }
  close() {
    this.items = []
    this.openModal = false
  }
  async getUnit() {
    let rs: any = await this.productsService.getUnit()
    if (rs.ok) {
      this.units = rs.rows
    } else {
      this.alertService.error(rs.error)
    }
  }
  setisActive(active: any, id: any) {
    const status = active.target.checked ? 'Y' : 'N';
    this.modalLoading.show();
    this.productsService.isActive(id, status)
      .then((result: any) => {
        if (result.ok) {
          this.alertService.success();
        } else {
          this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(result.error));
        }
        this.modalLoading.hide();
      })
      .catch(() => {
        this.modalLoading.hide();
        this.alertService.serverError();
      });
  }
}

