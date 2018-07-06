import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { HelperModule } from '../helper/helper.module';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { ModalsModule } from '../modals/modals.module';
import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';
import { TextMaskModule } from 'angular2-text-mask';
import { UpperCaseDirective } from './upper-case.directive';

import { SearchGenericsBoxComponent } from './search-generics-box/search-generics-box.component';
import { SelectReceiveUnitComponent } from './select-receive-unit/select-receive-unit.component';
import { SearchProductComponent } from './search-product/search-product.component';

import { SearchEquipmentProductComponent } from './search-equipment-product/search-equipment-product.component';
import { SearchEquipmentsBoxComponent } from './search-equipments-box/search-equipments-box.component';
import { SearchEquipmentsBox2Component } from './search-equipments-box2/search-equipments-box2.component';
@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    AgxTypeaheadModule,
    HelperModule,
    TextMaskModule,
    MyDatePickerTHModule,
    ModalsModule,
  ],
  declarations: [
    SelectReceiveUnitComponent,
    UpperCaseDirective,
    SearchProductComponent,
    SearchGenericsBoxComponent,
    SearchEquipmentProductComponent,
    SearchEquipmentsBoxComponent,
    SearchEquipmentsBox2Component
  ],
  exports: [
    SelectReceiveUnitComponent,
    UpperCaseDirective,
    SearchProductComponent,
    SearchGenericsBoxComponent,
    SearchEquipmentProductComponent,
    SearchEquipmentsBoxComponent,
    SearchEquipmentsBox2Component
  ]
})
export class DirectivesModule { }
