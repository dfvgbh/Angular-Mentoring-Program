import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
  private isDialogShown = false;
  private onResolve;
  private onReject;

  constructor() { }

  isShown(): boolean {
    return this.isDialogShown;
  }

  show(): Promise<any> {
    if (this.isDialogShown) {
      return;
    }
    this.isDialogShown = true;
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

  private reset(): void {
    this.isDialogShown = false;
    this.onResolve = undefined;
    this.onReject = undefined;
  }
}
