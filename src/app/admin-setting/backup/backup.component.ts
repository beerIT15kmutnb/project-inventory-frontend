import { Component, OnInit, ViewChild, Inject,NgZone } from '@angular/core';
import { AlertService } from '../../alert.service';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {
  items: any = [];
  token: any;
  @ViewChild('modalLoading') public modalLoading: any;
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private alertService: AlertService,
    private settingService: SettingService
  ) {
    
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
        this.getBackup();
      }
    
      async getBackup() {
        this.modalLoading.show();
        try {
          const rs: any = await this.settingService.getBackupList();
          if (rs.ok) {
            this.modalLoading.hide();
            this.items = rs.rows;
          } else {
            this.alertService.error(rs.error);
          }
        } catch (error) {
          this.alertService.error(JSON.stringify(error));
        }
      }
    
      async doBackup() {
        this.alertService.confirm('ต้องการสำรองข้อมูล ใช่หรือไม่')
          .then(async () => {
            this.modalLoading.show();
            const rs: any = await this.settingService.backupDatabase();
            this.modalLoading.hide();
            console.log(rs);
            if (rs.ok) {
              this.alertService.success();
              this.getBackup();
            } else {
              this.alertService.error(rs.error);
            }
          }).catch(() => {
            this.modalLoading.hide();
            // no action
          })
      }
    
      removeFile(i: any) {
        this.alertService.confirm(`ต้องการลบไฟล์นี้ ใช่หรือไม่? [${i.backup_path}]`)
          .then(async () => {
            const rs: any = await this.settingService.removeBackupFile(i.backup_id);
            if (rs.ok) {
              this.alertService.success();
              this.getBackup();
            } else {
              this.alertService.error(rs.error);
            }
          }).catch(() => {
            // no action
          });
    
      }
    
      async downloadFile(i: any) {
        const url: any = `${this.apiUrl}/setting/backup/download/${i.backup_id}?token=${this.token}`;
        window.open(url, '_blank');
      }
    

}
