import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './products/products.component';
import { ReceiveComponent } from './receive/receive.component';
import { ReceivePurchaseComponent } from './receive-purchase/receive-purchase.component';
import { TransferDashboardComponent } from './transfer-dashboard/transfer-dashboard.component';
import { IssuesComponent } from './issues/issues.component';
import { RequisitionComponent } from './requisition/requisition.component';
import { AlertExpiredComponent } from './alert-expired/alert-expired.component';
import { ReceiveEditComponent } from './receive-edit/receive-edit.component';
import { IssuesNewComponent } from './issues-new/issues-new.component';
import { IssuesEditComponent } from './issues-edit/issues-edit.component';
import { RequisitionNewComponent } from './requisition-new/requisition-new.component';
import { RequisitionConfirmComponent } from './requisition-confirm/requisition-confirm.component';
import { UnitManagementComponent } from './unit-management/unit-management.component';
import { TypeManagementComponent } from './type-management/type-management.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    // canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'receives', component: ReceiveComponent },
      { path: 'receives/purchase', component: ReceivePurchaseComponent },
      { path: 'receives/edit', component: ReceiveEditComponent },
      { path: 'transfer-dashboard', component: TransferDashboardComponent },
      { path: 'issues', component: IssuesComponent },
      { path: 'issues/new', component: IssuesNewComponent },
      { path: 'issues/edit', component: IssuesEditComponent },
      { path: 'requisition', component: RequisitionComponent },
      { path: 'alert-expired', component: AlertExpiredComponent },
      { path: 'requisition/new', component: RequisitionNewComponent },
      { path: 'requisition/edit/:requisitionId', component: RequisitionNewComponent },
      { path: 'requisition/confirm', component: RequisitionConfirmComponent },
      { path: 'unit-management', component: UnitManagementComponent },
      { path: 'type-management', component: TypeManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
