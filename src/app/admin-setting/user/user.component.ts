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
}
