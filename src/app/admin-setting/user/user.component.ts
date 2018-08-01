import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from './../../alert.service';
import { PeopleService } from "./../people.service"
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  @ViewChild('modalLoading') public modalLoading: any;
  @ViewChild('pagination') pagination: any;
  users: any
  userTotal: any
  openModal = false;
  items: any = [];
  people: any;
  openModalPass = false;
  constructor(
    private alertService: AlertService,
    private peopleServicc: PeopleService

  ) { }

  ngOnInit() {
    // this.getPeoples()
  }
  async refresh(event:any){
    this.modalLoading.show()
    try {
      let rs: any = await this.peopleServicc.getUser()
      if (rs.ok) {
        this.users = rs.rows
        this.userTotal = +rs.total[0].total
      }else{
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }
    this.modalLoading.hide()
  }
  async getUsers() {
    this.modalLoading.show()
    try {
      let rs: any = await this.peopleServicc.getUser()
      if (rs.ok) {
        this.users = rs.rows
        this.userTotal = +rs.total[0].total
      }else{
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }
    this.modalLoading.hide()
  }


  close() {
    this.openModal = false;
    this.items = [];
  }
  close2() {
    this.openModalPass = false;
    this.items = [];
  }
  async addUser() {
    this.openModal = true;
    this.items ={
      username: '', 
      access_right: 'staff', 
      people_id: '',
      password:'',
      is_active:'Y'
    }
    let rs:any = await this.peopleServicc.getPeople()
    this.people = rs.rows
  }
  async saveAdd(){
    this.modalLoading.show();
    try {
      console.log(this.items.title_id);
      const rs = await this.peopleServicc.saveUser(this.items);
      console.log(rs.rows);
      if (rs.ok) {
        this.alertService.success();
        this.getUsers();
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

  async editSaveItem(){
    this.modalLoading.show();
    try {
      const rs = await this.peopleServicc.editUser(this.items);
      console.log(rs.rows);
      if (rs.ok) {
        this.alertService.success();
        this.getUsers();
        this.openModalPass = false;
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
    this.items = {
      user_id: item.user_id
    }
    this.openModalPass = true;
  }
}
