import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DenyComponent } from './deny/deny.component';
import { AlertService } from './alert.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { HelperModule } from './helper/helper.module';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { GridDetailModule } from './grid-detail/grid-detail.module';
import { AuthModule } from 'angular2-jwt';
import { DirectivesModule } from './directives/directives.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AdminSettingModule } from './admin-setting/admin-setting.module';
import { StaffModule } from './staff/staff.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DenyComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    LoginModule,
    AdminModule,
    AdminSettingModule,
    StaffModule,
    HelperModule,
    FormsModule,
    ClarityModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    GridDetailModule,
    DirectivesModule,
    TextMaskModule,
  ],
  providers: [
    AlertService,
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'DOC_URL', useValue: environment.docUrl },
    { provide: 'HOME_URL', useValue: environment.homeUrl },
    { provide: 'LOGIN_URL', useValue: environment.loginUrl },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
