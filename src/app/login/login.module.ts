import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
// import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    LoginRoutingModule
  ],
  declarations: [LoginPageComponent],
  providers: [
    LoginService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class LoginModule { }
