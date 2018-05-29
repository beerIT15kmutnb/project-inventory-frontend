import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { StaffRoutingModule } from './staff-routing.module';
import { RequisitionComponent } from './requisition/requisition.component';
import { RequisitionNewComponent } from './requisition-new/requisition-new.component';
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
import { RequisitionService } from './requisition.service';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products.service';

@NgModule({
  imports: [
    CommonModule,
    StaffRoutingModule,
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
  ],
  declarations: [
    LayoutComponent,
    RequisitionComponent,
    RequisitionNewComponent,
    ProductsComponent
  ],
  providers:[
    LayoutComponent,
    RequisitionComponent,
    RequisitionNewComponent,
    ProductsComponent,
    RequisitionService,
    ProductsService
  ]
})
export class StaffModule { }
