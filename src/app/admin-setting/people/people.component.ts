import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from './../../alert.service';
import { PeopleService } from './../people.service';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})

export class PeopleComponent implements OnInit {
  @ViewChild('modalLoading') public modalLoading: any;
  @ViewChild('pagination') pagination: any;
  peoples: any;
  peopleTotal: any;
  openModal = false;
  items: any = [];
  titles: any;
  constructor(
    private alertService: AlertService,
    private peopleServicc: PeopleService

  ) { }

  ngOnInit() {
    // this.getPeoples()
    this.getTitles();
  }
  async refresh(event: any) {
    this.modalLoading.show();
    try {
      const rs: any = await this.peopleServicc.getPeople();
      if (rs.ok) {
        this.peoples = rs.rows;
        this.peopleTotal = +rs.total[0].total;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
  }
  async getPeoples() {
    this.modalLoading.show();
    try {
      const rs: any = await this.peopleServicc.getPeople();
      if (rs.ok) {
        this.peoples = rs.rows;
        this.peopleTotal = +rs.total[0].total;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
  }
  async getTitles() {
    this.modalLoading.show();
    try {
      const rs: any = await this.peopleServicc.getTitles();
      if (rs.ok) {
        this.titles = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
  }
  addPeople() {
    this.openModal = true;
    this.items ={
      title_id: '', 
      fname: '', 
      lname: '',
      is_active :'Y'
    }
  }
  close() {
    this.openModal = false;
    this.items = [];
  }
  changActive(event: any) {
    this.items.is_active = event.target.checked ? 'Y' : 'N';
  }
  async saveAdd() {
    this.modalLoading.show();
    try {
      console.log(this.items.title_id);
      const rs = await this.peopleServicc.savePeople(this.items);
      console.log(rs.rows);
      if (rs.ok) {
        this.alertService.success();
        this.getPeoples();
        this.openModal = false;
        this.items = [];
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
  }
 async editSaveItem() {
    this.modalLoading.show();
    try {
      console.log(this.items);
      
      const rs = await this.peopleServicc.editPeople(this.items);
      console.log(rs.rows);

      if (rs.ok) {
        this.alertService.success();
        this.getPeoples();
        this.openModal = false;
        this.items = [];
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
    this.modalLoading.hide();
  }
  async editItem(item: any) {
    this.items = item;
    console.log(this.items);
    
  this.openModal = true;
  }
}
