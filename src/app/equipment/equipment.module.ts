import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './products/products.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ModalsModule } from '../modals/modals.module';
import { ReceiveComponent } from './receive/receive.component';
import { HelperModule } from '../helper/helper.module';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { ReceivePurchaseComponent } from './receive-purchase/receive-purchase.component';
import { ToThaiDatePipe } from '../helper/to-thai-date.pipe';
import { TransferDashboardComponent } from './transfer-dashboard/transfer-dashboard.component';
import { IssuesComponent } from './issues/issues.component';
import { RequisitionComponent } from './requisition/requisition.component';
import { AlertExpiredComponent } from './alert-expired/alert-expired.component';
import { ProductsService } from './products.service';
import { AuthModule } from '../auth/auth.module';
import { ReceiveService } from './receive.service';
import { GridDetailModule } from '../grid-detail/grid-detail.module';
import { DirectivesModule } from '../directives/directives.module';
import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';
import { TextMaskModule } from 'angular2-text-mask';
import { ReceiveEditComponent } from './receive-edit/receive-edit.component';
import { IssueService } from './issue.service';
import { IssuesNewComponent } from './issues-new/issues-new.component';
import { AlertExpiredService } from './alert-expired.service';
import { TransferDashboardService } from './transfer-dashboard.service';
import { IssuesEditComponent } from './issues-edit/issues-edit.component';
import { RequisitionService } from './requisition.service';
import { RequisitionNewComponent } from './requisition-new/requisition-new.component';
import { RequisitionConfirmComponent } from './requisition-confirm/requisition-confirm.component';
import { ProductsNewComponent } from './products-new/products-new.component';
import { UnitManagementComponent } from './unit-management/unit-management.component';
import { TypeManagementComponent } from './type-management/type-management.component';
import { EquipmentsService } from './equipments.service';
import { TypeIssueComponent } from './type-issue/type-issue.component';
import { AdditionComponent } from './addition/addition.component';
import { AdditionService } from './addition.service';
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
    EquipmentRoutingModule,
    GridDetailModule,
    DirectivesModule,
    AgxTypeaheadModule,
  
  ],
  declarations: [
    LayoutComponent, 
    ProductsComponent, 
    ReceiveComponent, 
    ReceivePurchaseComponent,
    TransferDashboardComponent,
    IssuesComponent,
    RequisitionComponent,
    AlertExpiredComponent,
    ReceiveEditComponent,
    IssuesNewComponent,
    IssuesEditComponent,
    RequisitionNewComponent,
    RequisitionConfirmComponent,
    ProductsNewComponent,
    UnitManagementComponent,
    TypeManagementComponent,
    TypeIssueComponent,
    AdditionComponent
  ],
  providers:[
    ToThaiDatePipe,
    ProductsService,
    ReceiveService,
    IssueService,
    AlertExpiredService,
    TransferDashboardService,
    RequisitionService,
    EquipmentsService,
    AdditionService
  ]
})
export class EquipmentModule { }
