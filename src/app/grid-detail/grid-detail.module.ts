import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { HelperModule } from '../helper/helper.module';
import { FormsModule } from '@angular/forms';
import { ModalsModule } from '../modals/modals.module';
import { DirectivesModule } from '../directives/directives.module';

import { IssueProductComponent } from './issue-product/issue-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { transectionIssuedetailComponent } from './transection-issue-detail/transection-issue-detail.component';
import { RequisitionOrderDetailComponent } from './requisition-order-detail/requisition-order-detail.component';
import { AdditionOrderDetailComponent } from './addition-order-detail/addition-order-detail.component';

import { EquipmentIssueProductComponent } from './equipment-issue-product/equipment-issue-product.component';
import { EquipmentProductDetailComponent } from './equipment-product-detail/equipment-product-detail.component';
import { EquipmentTransectionIssuedetailComponent } from './equipment-transection-issue-detail/equipment-transection-issue-detail.component';
import { EquipmentRequisitionOrderDetailComponent } from './equipment-requisition-order-detail/equipment-requisition-order-detail.component';
import { EquipmentAdditionOrderDetailComponent } from './equipment-addition-order-detail/equipment-addition-order-detail.component';


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
    RequisitionOrderDetailComponent,
    AdditionOrderDetailComponent,
    EquipmentProductDetailComponent,
    EquipmentIssueProductComponent,
    EquipmentTransectionIssuedetailComponent,
    EquipmentRequisitionOrderDetailComponent,
    EquipmentAdditionOrderDetailComponent
  ],
  exports:[
    ProductDetailComponent,
    IssueProductComponent,
    transectionIssuedetailComponent,
    RequisitionOrderDetailComponent,
    AdditionOrderDetailComponent,
    EquipmentProductDetailComponent,
    EquipmentIssueProductComponent,
    EquipmentTransectionIssuedetailComponent,
    EquipmentRequisitionOrderDetailComponent,
    EquipmentAdditionOrderDetailComponent
  ]
})
export class GridDetailModule { }
