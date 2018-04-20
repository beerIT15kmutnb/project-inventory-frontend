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
@NgModule({
  imports: [
    CommonModule,
    HelperModule,
    ClarityModule,
    FormsModule,
    ModalsModule,
    MyDatePickerTHModule,
    AdminRoutingModule
    
  ],
  declarations: [
    LayoutComponent, 
    ProductsComponent, 
    ReceiveComponent, 
    ReceivePurchaseComponent,
    TransferDashboardComponent,
    IssuesComponent,
    RequisitionComponent,
    AlertExpiredComponent
  ],
  providers:[
    ToThaiDatePipe,
  ]
})
export class AdminModule { }
