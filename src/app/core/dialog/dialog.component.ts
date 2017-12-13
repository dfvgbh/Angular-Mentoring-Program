import { Component } from '@angular/core';

import { DialogService } from '../services';
import { DialogConfig } from '../models';

@Component({
  selector: 'amp-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  title = 'Are you sure?';

  constructor(private dialogService: DialogService) {
  }

  isShown(): boolean {
    return this.dialogService.isShown();
  }

  accept(): void {
    this.dialogService.accept();
  }

  decline(): void {
    this.dialogService.decline();
  }

  getDialogConfig(): DialogConfig {
    return this.dialogService.getDialogConfig();
  }
}
