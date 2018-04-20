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
      { path: 'transfer-dashboard', component: TransferDashboardComponent },
      { path: 'issues', component: IssuesComponent },
      { path: 'requisition', component: RequisitionComponent },
      { path:'alert-expired' , component: AlertExpiredComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
