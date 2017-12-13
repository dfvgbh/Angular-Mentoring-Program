import { Injectable } from '@angular/core';

import { DialogConfig } from '../models';

@Injectable()
export class DialogService {
  private isDialogShown = false;
  private onResolve;
  private onReject;
  private dialogConfig: DialogConfig;

  constructor() { }

  isShown(): boolean {
    return this.isDialogShown;
  }

  show(dialogConfig: DialogConfig): Promise<any> {
    if (this.isDialogShown) {
      return;
    }
    this.isDialogShown = true;
    this.dialogConfig = dialogConfig;

    return new Promise((resolve, reject) => {
      this.onResolve = resolve;
      this.onReject = reject;
    });
  }

  decline(): void {
    this.onReject();
    this.reset();
  }

  accept(): void {
    this.onResolve();
    this.reset();
  }

  getDialogConfig(): DialogConfig {
    return this.dialogConfig;
  }

  private reset(): void {
    this.isDialogShown = false;
    this.onResolve = undefined;
    this.onReject = undefined;
  }
}
