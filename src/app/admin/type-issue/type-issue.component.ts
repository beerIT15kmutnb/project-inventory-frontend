import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AlertService } from "../../alert.service";
import { IssueService } from '../issue.service';
@Component({
  selector: 'app-type-issue',
  templateUrl: './type-issue.component.html',
  styleUrls: ['./type-issue.component.css']
})
export class TypeIssueComponent implements OnInit {
  @ViewChild('modalLoading') public modalLoading: any;
  items: any = []
  types: any = []
  openModal = false
  constructor(    @Inject('API_URL') private apiUrl: string,
  private alertService: AlertService,
  private issueService: IssueService) { }

  ngOnInit() {
    this.getType()
  }
  async edit(item: any) {
    this.items = item
    this.openModal = true
  }
  async getType() {
    let rs: any = await this.issueService.getType()
    if (rs.ok) {
      console.log(rs.rows);
      
      this.types = rs.rows
    } else {
      this.alertService.error(rs.error)
    }
  }
  async saveEdit(){
    console.log(this.items);
    let rs:any = await this.issueService.editType(this.items)
    if(rs.ok){
      this.openModal = false
      this.items = []
      this.alertService.success()
      this.getType()
    } else {
      this.alertService.error(rs.error)
    }
  }
  changActiveGeneric(event: any) {
    this.items.is_active = event.target.checked ? 'Y' : 'N';
  }
  async saveAdd(){
    console.log(this.items);
    let rs:any = await this.issueService.addType(this.items)
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
      transection_name: '',
      is_active: 'Y'
    }
  }
  close() {
    this.items = []
    this.openModal = false
  }
  setisActive(active: any, id: any) {
    const status = active.target.checked ? 'Y' : 'N';
    this.modalLoading.show();
    this.issueService.isActive(id, status)
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
