import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from './../../alert.service';
import { PeopleService } from "./../people.service"
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})

export class PeopleComponent implements OnInit {
  @ViewChild('modalLoading') public modalLoading: any;
  @ViewChild('pagination') pagination: any;
  peoples: any
  peopleTotal: any
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
      let rs: any = await this.peopleServicc.getPeople()
      if (rs.ok) {
        this.peoples = rs.rows
        this.peopleTotal = +rs.total[0].total
      }else{
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }
    this.modalLoading.hide()
  }
  async getPeoples() {
    this.modalLoading.show()
    try {
      let rs: any = await this.peopleServicc.getPeople()
      if (rs.ok) {
        this.peoples = rs.rows
        this.peopleTotal = +rs.total[0].total
      }else{
        this.alertService.error(rs.error)
      }
    } catch (error) {
      this.alertService.error(error)
    }
    this.modalLoading.hide()
  }
}
