import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DenyComponent } from './deny/deny.component';
import { LoginPageComponent } from './login/login-page/login-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // { path: 'login',component: LoginPageComponent },
    { path: 'access-denied', component: DenyComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }