import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ClarityModule } from '@clr/angular';
import { HelperModule } from '../helper/helper.module';
import { FormsModule } from '@angular/forms';
import { ModalsModule } from '../modals/modals.module';
import { IssueProductComponent } from './issue-product/issue-product.component';
import { DirectivesModule } from '../directives/directives.module';
import { transectionIssuedetailComponent } from './transection-issue-detail/transection-issue-detail.component';
import { RequisitionOrderDetailComponent } from './requisition-order-detail/requisition-order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    
    HelperModule,
    FormsModule,
    DirectivesModule,
    ModalsModule,
    ClarityModule
  ],
  declarations: [
    ProductDetailComponent,
    IssueProductComponent,
    transectionIssuedetailComponent,
    RequisitionOrderDetailComponent
  ],
  exports:[
    ProductDetailComponent,
    IssueProductComponent,
    transectionIssuedetailComponent,
    RequisitionOrderDetailComponent
  ]
})
export class GridDetailModule { }
