import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from '../../../node_modules/angular2-jwt';

@Injectable()
export class SettingService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    // @Inject('API_CONTRACT') private apiContract: any,
    private authHttp: AuthHttp
  ) { 
    
  }
  async backupDatabase() {
    const rs: any = await this.authHttp.get(`${this.apiUrl}/setting/backup/save`)
      .toPromise();
    return rs.json();
  }

  async getBackupList() {
    const rs: any = await this.authHttp.get(`${this.apiUrl}/setting/backup/list`)
      .toPromise();
    return rs.json();
  }

  async downloadBackupFile(backupId: any) {
    const rs: any = await this.authHttp.get(`${this.apiUrl}/setting/backup/download/${backupId}`)
      .toPromise();
    return rs.json();
  }

  async removeBackupFile(backupId: any) {
    const rs: any = await this.authHttp.delete(`${this.apiUrl}/setting/backup/remove/${backupId}`)
      .toPromise();
    return rs.json();
  }

}
