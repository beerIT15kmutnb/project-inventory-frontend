import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './products/products.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ClarityModule
  ],
  declarations: [LayoutComponent, ProductsComponent]
})
export class AdminModule { }
