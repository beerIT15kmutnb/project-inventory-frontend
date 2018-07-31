import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PeopleComponent } from './people/people.component';
import { UserComponent } from './user/user.component';
import { BackupComponent } from './backup/backup.component';
const routes: Routes = [
  {
    path: 'admin-setting',
    component: LayoutComponent,
    // canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'people', pathMatch: 'full' },
      { path: 'people', component: PeopleComponent },
      { path: 'user', component: UserComponent },
      { path: 'backup', component: BackupComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingRoutingModule { }
