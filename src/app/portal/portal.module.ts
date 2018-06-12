import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { PortalRoutingModule } from './portal-routing.module';
import { AuthModule } from 'angular2-jwt';
import { HelperModule } from '../helper/helper.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ModalsModule } from '../modals/modals.module';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { GridDetailModule } from '../grid-detail/grid-detail.module';
import { DirectivesModule } from '../directives/directives.module';
import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard.service';
import { ChartModule } from 'angular2-highcharts'
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    HelperModule,
    ClarityModule,
    FormsModule,
    TextMaskModule,
    ModalsModule,
    MyDatePickerTHModule,
    GridDetailModule,
    DirectivesModule,
    AgxTypeaheadModule,
    PortalRoutingModule,
    ChartModule,
    // HighchartsStatic
  ],
  declarations: [
    LayoutComponent,
    DashboardComponent,
    
  ],
  providers:[
    DashboardService,
    { provide: HighchartsStatic, useFactory: highchartsFactory }
  ]
})
export class PortalModule { }
export function highchartsFactory() {
  return require('highcharts');
}
const Highcharts = require('highcharts');

Highcharts.setOptions({
  credits: false
});