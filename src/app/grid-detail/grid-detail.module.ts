import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ClarityModule } from '@clr/angular';
import { HelperModule } from '../helper/helper.module';
import { FormsModule } from '@angular/forms';
import { ModalsModule } from '../modals/modals.module';
import { IssueProductComponent } from './issue-product/issue-product.component';
import { DirectivesModule } from '../directives/directives.module';

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
    IssueProductComponent
  ],
  exports:[
    ProductDetailComponent,
    IssueProductComponent
  ]
})
export class GridDetailModule { }
