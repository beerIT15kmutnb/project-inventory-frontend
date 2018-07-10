import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AlertService } from './../../alert.service';
import * as _ from 'lodash';
import { TransferDashboardService } from '../transfer-dashboard.service';
import { State } from '@clr/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-dashboard',
  templateUrl: './transfer-dashboard.component.html',
  styles: []
})
export class TransferDashboardComponent implements OnInit {


  offset: number;
  currentPage = 1;
  @ViewChild('modalLoading') private modalLoading;
  @ViewChild('htmlPreview') public htmlPreview: any;
  selectedApprove = [];
  generics: any = [];
  transections: any = [];
  orders = [];
  histories: any = [];
  warehouses: any = [];
  perPage = 50;
  selectedAddition = [];
  products: any;
  _rs:any =[]
  exportExcel: any = {
    printMount: 'cc',
    _rs: [{
      detail: [{
        generic_name:'',
        req_qty:'',
        unit_name:''
      }],
      generic_type_id: '',
      generic_type_name: 'ppp',
      is_active: ''
    }]
  };
  openModal: boolean = false;
  filename: string;
  constructor(
    private dashboardSevice: TransferDashboardService,
    private alertService: AlertService,
    private router: Router,
    @Inject('API_URL') private apiUrl: string
  ) { }

  ngOnInit() {
  }
  addition() {
    this.router.navigate(['/admin/addition'], { queryParams: { generics: JSON.stringify(this.selectedApprove) } });
    // routerLink="/admin/addition" [queryParams]="{generics: selectedApprove}"
  }
  async refreshList(state: State) {
    this.offset = +state.page.from;
    sessionStorage.setItem('additionPagedb', this.currentPage.toString());
    this.getWaitingList();
  }
  async getWaitingList() {
    this.modalLoading.show();
    try {
      const rs: any = await this.dashboardSevice.getWaitingList(this.perPage, this.offset);
      if (rs.ok) {
        console.log(rs.rows);

        this.orders = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error.message);
    }
  }
  async refresh(state: State) {
    this.offset = +state.page.from;
    sessionStorage.setItem('currentPagedb', this.currentPage.toString());
    this.getWaiting();
  }

  async getWaiting() {
    this.modalLoading.show();
    try {
      const rs: any = await this.dashboardSevice.gettransection(this.perPage, this.offset);
      if (rs.ok) {
        console.log(rs.rows);

        this.products = rs.rows[0];
      } else {
        this.alertService.error(rs.error);
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error.message);
    }
  }

  print2(item: any) {
    const url = `${this.apiUrl}/report/addGen/${item.addition_id}`;
    // ?token=${this.token}`;
    console.log(url);
    this.htmlPreview.showReport(url, 'landscape');
  }

  async print(item: any) {
    this.modalLoading.show();
    this.openModal = true
    try {
      const rs: any = await this.dashboardSevice.exportExcel(item.addition_id);
      if (rs.ok) {
        console.log(rs.rows);

        this.exportExcel = rs.rows;
        this._rs = this.exportExcel._rs
        console.log(this._rs);

      } else {
        this.alertService.error(rs.error);
      }
      this.modalLoading.hide();
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error.message);
    }
  }

  _fallbacktoCSV: true;
  _filename: any ;
  
  toXLS (tableId) {
    console.log(tableId);
    
    // this._filename = ( filename === 'undefined') ? tableId : filename;

    //var ieVersion = this._getMsieVersion();
    //Fallback to CSV for IE & Edge
    // if ((this._getMsieVersion() || this._isFirefox()) && this._fallbacktoCSV) {
    //   return this.toCSV(tableId);
    // } else if (this._getMsieVersion() || this._isFirefox()) {
    //   alert("Not supported browser");
    // }

    //Other Browser can download xls
    let htmltable = document.getElementById(tableId);
    let html = htmltable.outerHTML;

    this._downloadAnchor("data:application/vnd.ms-excel" + encodeURIComponent(html), 'xls');
  }

  toCSV(tableId) {
    this.filename = 'รายงานประมาณการยา/เวชภัณฑ์ ประจำเดือน '+this.exportExcel.printMount;
    this._filename = (typeof this.filename === 'undefined') ? tableId : this.filename;
    // Generate our CSV string from out HTML Table
    let csv = this._tableToCSV(document.getElementById(tableId));
    // Create a CSV Blob
    let blob = new Blob([csv], { type: "UTF-8" });
    // Determine which approach to take for the download
    if (navigator.msSaveOrOpenBlob) {
      // Works for Internet Explorer and Microsoft Edge
      navigator.msSaveOrOpenBlob(blob, this._filename + ".csv");
    } else {
      this._downloadAnchor(URL.createObjectURL(blob), 'csv');
    }
  }
  
  _getMsieVersion() {
    let ua = window.navigator.userAgent;

    let msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }

    let trident = ua.indexOf("Trident/");
    if (trident > 0) {
      // IE 11 => return version number
      let rv = ua.indexOf("rv:");
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }

    let edge = ua.indexOf("Edge/");
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    }

    // other browser
    return false;
  }
  _isFirefox () {
    if (navigator.userAgent.indexOf("Firefox") > 0) {
      return 1;
    }

    return 0;
  }
  _downloadAnchor(content, ext) {
    let anchor:any = document.createElement("a");
    anchor.style = "display:none !important";
    anchor.id = "downloadanchor";
    document.body.appendChild(anchor);

    // If the [download] attribute is supported, try to use it

    if ("download" in anchor) {
      anchor.download = this._filename + "." + ext;
    }
    anchor.href = content;
    anchor.click();
    anchor.remove();
  }
  _tableToCSV(table) {
    // We'll be co-opting `slice` to create arrays
    let slice = Array.prototype.slice;

    return slice
      .call(table.rows)
      .map(function (row) {
        return slice
          .call(row.cells)
          .map(function (cell) {
            return '"t"'.replace("t", cell.textContent);
          })
          .join(",");
      })
      .join("\r\n");
  }

}
