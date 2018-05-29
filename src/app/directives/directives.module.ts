import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectReceiveUnitComponent } from './select-receive-unit/select-receive-unit.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { HelperModule } from '../helper/helper.module';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { ModalsModule } from '../modals/modals.module';
import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';
import { TextMaskModule } from 'angular2-text-mask';
import { UpperCaseDirective } from './upper-case.directive';
import { SearchGenericsBoxComponent } from './search-generics-box/search-generics-box.component';

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
    SearchProductComponent,
    UpperCaseDirective,
    SearchGenericsBoxComponent
  ],
  exports: [
    SelectReceiveUnitComponent,
    SearchProductComponent,
    UpperCaseDirective,
    SearchGenericsBoxComponent
  ]
})
export class DirectivesModule { }
