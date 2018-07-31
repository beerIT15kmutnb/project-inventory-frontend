import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { AdminSettingRoutingModule } from './admin-setting-routing.module';
import { PeopleComponent } from './people/people.component';
import { AuthModule } from 'angular2-jwt';
import { HelperModule } from '../helper/helper.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ModalsModule } from '../modals/modals.module';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { GridDetailModule } from '../grid-detail/grid-detail.module';
import { DirectivesModule } from '../directives/directives.module';
import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';
import { PeopleService } from './people.service';
import { UserComponent } from './user/user.component';
import { BackupComponent } from './backup/backup.component';
import { SettingService } from './setting.service';
@NgModule({
  imports: [

    CommonModule,
    AuthModule,
    HelperModule,
    ClarityModule,
    FormsModule,
    TextMaskModule,
    ModalsModule,
    MyDatePickerTHModule,
    AdminSettingRoutingModule,
    GridDetailModule,
    DirectivesModule,
    AgxTypeaheadModule
    
  ],
  declarations: [
    LayoutComponent,
    PeopleComponent,
    UserComponent,
    BackupComponent
  ],
  providers:[
    PeopleService,
    SettingService
  ]
})
export class AdminSettingModule { }
