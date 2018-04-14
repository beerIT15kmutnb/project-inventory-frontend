import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
  ],
  declarations: [LoadingModalComponent],
  exports:[
    LoadingModalComponent
  ]
})
export class ModalsModule { }
