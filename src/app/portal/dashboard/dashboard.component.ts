import { DashboardService } from './../dashboard.service';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { forEach } from '@angular/router/src/utils/collection';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showGraphGenerics: any;
  _dataEquipment: any = [];
  orders_data: any;
  generic_data: any;
  inven_data: any;
  showInven_cost: any;
  data_po: any = [];
  data_po_price: any = [];
  barChartData2: any[] = [];
  _data = [];
  chartOptionsOrdersGenerics: any;
  chartOptionsOrdersEquipment: any;
  chartOptions_purchase: any;
  chartOptions_Inventory: any;
  showData: any = []
  showGraphEquipments:any
  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.chartOptions_Orders_Generics();
    this.chartOptions_Orders_Equipments();
    this.showGraph_Inventory_Equipments();
    this.showGraph_Inventory_Generics();
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  async chartOptions_Orders_Generics() {
    const rs: any = await this.dashboardService.getTopTenReqGen();
    if (rs.ok) {
      this.orders_data = rs.rows[0];
      console.log(this.orders_data);
      for (let i of this.orders_data) {
        this._data.push({
          name: i.generic_name,
          y: i.countReq
        })
      }
    }
    console.log();

    this.chartOptionsOrdersGenerics = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: 'คิดเป็น: <b>{point.percentage:.0f}% {series.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          colors: ['#B71C1C', '#BF360C', '#EF6C00', '#FFA000', '#FDD835', '#CDDC39', '#9CCC65', '#81C784', '#80CBC4', '#B2EBF2'],
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'สถานะ',
        colorByPoint: true,
        data: this._data
      }],
    };
  }
  async chartOptions_Orders_Equipments() {
    const rs: any = await this.dashboardService.getTopTenReqEq();
    if (rs.ok) {
      this.orders_data = rs.rows[0];
      console.log(this.orders_data);
      for (let i of this.orders_data) {
        this._dataEquipment.push({
          name: i.equipment_name,
          y: i.countReq
        })
      }
    }
    console.log();

    this.chartOptionsOrdersEquipment = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: 'คิดเป็น: <b>{point.percentage:.0f}% {series.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          colors: ['#B71C1C', '#BF360C', '#EF6C00', '#FFA000', '#FDD835', '#CDDC39', '#9CCC65', '#81C784', '#80CBC4', '#B2EBF2'],
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'สถานะ',
        colorByPoint: true,
        data: this._dataEquipment
      }],
    };
  }

  async showGraph_Inventory_Generics() {
    let data
    let dates
    const rs: any = await this.dashboardService.getTopFiveMonthReqGen();
    if (rs.ok) {
      data = rs.rows.jsonFrom;
      dates = rs.rows.Dates;
    }
    console.log(rs.rows);
    
    this.showGraphGenerics = {
      chart: {
        type: 'column'
      },
      title: {
        text: '5 อันดับ รายการยา/เวชภัณฑ์เบิกประจำเดือน'
      },
      xAxis: {
        categories: dates
      },
      yAxis: {
        min: 0,
        title: {
          text: 'จำนวน'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        floating: false,
        // borderColor: '#CCC',
        // borderWidth: 1,
        // shadow: true
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          }
        }
      },

      series: data
    }
    console.log(data);

  }
  async showGraph_Inventory_Equipments() {
    let data
    let dates
    const rs: any = await this.dashboardService.getTopFiveMonthReqEq();
    if (rs.ok) {
      data = rs.rows.jsonFrom;
      dates = rs.rows.Dates;
    }
    console.log(rs.rows);
    
    this.showGraphEquipments = {
      chart: {
        type: 'column'
      },
      title: {
        text: '5 อันดับ รายการเบิกอุปกร์สำนักงานประจำเดือน'
      },
      xAxis: {
        categories: dates
      },
      yAxis: {
        min: 0,
        title: {
          text: 'จำนวน'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        floating: false,
        // borderColor: '#CCC',
        // borderWidth: 1,
        // shadow: true
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          }
        }
      },

      series: data
    }
    console.log(data);

  }
  // async showGraph_purchase() {
  //   const rs: any = await this.dashboardService.generic_data();
  //   let data_generic: any = [];
  //   let data_product: any = [];
  //   let data_generic_per: any = [];
  //   let data_product_per: any = [];
  //   let data_name: any = [];

  //   if (rs.ok) {
  //     this.generic_data = rs.rows;
  //     this.generic_data.forEach(e => {
  //       data_name.push(e.generic_type_name);
  //       data_generic.push(e.count_generic_id);
  //       data_product.push(e.count_product_id);
  //       const per = (e.count_generic_id * 100) / e.count_product_id;
  //       data_generic_per.push({ y: per, name: 'เวชภัณฑ์ที่ถึงจุดสั่งซื้อ ' + e.count_generic_id + ' รายการ' });
  //       data_product_per.push({ y: 100 - per, name: 'เวชภัณฑ์ที่ยังไม่ถึงจุดสั่งซื้อ ' + (e.count_product_id - e.count_generic_id) + ' รายการ' });
  //     });
  //   }
  //   this.chartOptions_purchase = {
  //     chart: {
  //       type: 'bar'
  //     },
  //     title: {
  //       text: ''
  //     },
  //     tooltip: {
  //       pointFormat: 'คิดเป็น: <b>{point.percentage:.0f}% {series.y}</b>'
  //     },
  //     xAxis: {
  //       categories: data_name
  //     },
  //     yAxis: {
  //       min: 0,
  //       title: {
  //         text: ''
  //       }
  //     },
  //     legend: {
  //       reversed: true
  //     },
  //     plotOptions: {
  //       series: {
  //         stacking: 'normal'
  //       }
  //     },
  //     series: [{
  //       name: 'เวชภัณฑ์ที่ยังไม่ถึงจุดสั่งซื้อ',
  //       data: data_product_per
  //     }, {
  //       name: 'เวชภัณฑ์ที่ถึงจุดสั่งซื้อ',
  //       data: data_generic_per
  //     }]
  //   }
  // }
  // async showGraph_Inventory() {
  //   const rs: any = await this.dashboardService.showInven_cost();
  //   let data_Inventory: any = [];
  //   if (rs.ok) {
  //     this.showInven_cost = rs.rows;
  //     this.showInven_cost.forEach(e => {
  //       data_Inventory.push({ name: e.warehouse_name, y: e.sum_cost });
  //     });
  //   }
  //   // console.log(data_Inventory);
  //   this.chartOptions_Inventory = {
  //     chart: {
  //       type: 'column'
  //     },
  //     title: {
  //       text: ''
  //     },
  //     subtitle: {
  //       text: ''
  //     },
  //     xAxis: {
  //       type: 'category',
  //       labels: {
  //         rotation: -45,
  //         style: {
  //           fontSize: '13px',
  //           fontFamily: 'Verdana, sans-serif'
  //         }
  //       }
  //     },
  //     yAxis: {
  //       min: 0,
  //       title: {
  //         text: ''
  //       }
  //     },
  //     legend: {
  //       enabled: false
  //     },
  //     tooltip: {
  //       pointFormat: '<b>{point.y:.0f}</b> รายการที่ถึงจุดเติม'
  //     },
  //     series: [{
  //       name: '',
  //       data: data_Inventory,
  //       dataLabels: {
  //         enabled: true,
  //         rotation: 0,
  //         color: '#FFFFFF',
  //         align: 'center',
  //         format: '{point.y:.0f}', // one decimal
  //         y: 50, // 10 pixels down from the top
  //         style: {
  //           fontSize: '13px',
  //           fontFamily: 'Verdana, sans-serif'
  //         }
  //       }
  //     }]
  //   }
  // }
}

