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


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DenyComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    AdminModule,
    HelperModule,
    FormsModule,
    ClarityModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    AlertService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
