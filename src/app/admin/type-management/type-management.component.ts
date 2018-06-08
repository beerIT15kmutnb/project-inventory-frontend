import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AlertService } from "../../alert.service";
import { GenericsService } from "../generics.service"
// import * as _ from 'lodash';
// import * as moment from 'moment';
// import { JwtHelper } from 'angular2-jwt';
@Component({
  selector: 'app-type-management',
  templateUrl: './type-management.component.html',
  styleUrls: ['./type-management.component.css']
})
export class TypeManagementComponent implements OnInit {
  @ViewChild('modalLoading') public modalLoading: any;
  items: any = []
  types: any = []
  openModal = false
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private alertService: AlertService,
    private genericsService: GenericsService
  ) {
    // private 
  }
  ngOnInit() {
    this.getType()
  }
  async edit(item: any) {
    this.items = item
    this.openModal = true
  }
  changActiveGeneric(event: any) {
    this.items.is_active = event.target.checked ? 'Y' : 'N';
  }
  async saveEdit(){
    console.log(this.items);
    let rs:any = await this.genericsService.editType(this.items)
    if(rs.ok){
      this.openModal = false
      this.items = []
      this.alertService.success()
      this.getType()
    } else {
      this.alertService.error(rs.error)
    }
  }
  async saveAdd(){
    console.log(this.items);
    let rs:any = await this.genericsService.addType(this.items)
    if(rs.ok){
      this.openModal = false
      this.items = []
      this.alertService.success()
      this.getType()
    } else {
      this.alertService.error(rs.error)
    }
  }
  async add() {
    this.openModal = true
    this.items = {
      generic_type_name: '',
      is_active: 'Y'
    }
  }
  close() {
    this.items = []
    this.openModal = false
  }
  async getType() {
    let rs: any = await this.genericsService.getType()
    if (rs.ok) {
      this.types = rs.rows
    } else {
      this.alertService.error(rs.error)
    }
  }
  setisActive(active: any, id: any) {
    const status = active.target.checked ? 'Y' : 'N';
    this.modalLoading.show();
    this.genericsService.isActive(id, status)
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
