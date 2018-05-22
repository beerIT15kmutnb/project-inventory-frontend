import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
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
    AdminRoutingModule,
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
    RequisitionNewComponent
  ],
  providers:[
    ToThaiDatePipe,
    ProductsService,
    ReceiveService,
    IssueService,
    AlertExpiredService,
    TransferDashboardService,
    RequisitionService
  ]
})
export class AdminModule { }
