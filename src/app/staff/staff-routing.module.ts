import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RequisitionComponent } from './requisition/requisition.component';
import { RequisitionNewComponent } from './requisition-new/requisition-new.component';
import { ProductsComponent } from './products/products.component';
// import { PeopleComponent } from './people/people.component';
// import { UserComponent } from './user/user.component';
const routes: Routes = [
  {
    path: 'staff',
    component: LayoutComponent,
    // canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'requisition', pathMatch: 'full' },
      { path: 'requisition', component: RequisitionComponent },
      { path: 'requisition/new', component: RequisitionNewComponent },
      { path: 'requisition/edit/:requisitionId', component: RequisitionNewComponent },
      { path: 'products',component :ProductsComponent}
      // { path: 'people', component: PeopleComponent },
      // { path: 'user', component: UserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
