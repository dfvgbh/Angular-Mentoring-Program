import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as services from './services';
import * as components from './components';

function toArray(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [...toArray(services)],
  declarations: [...toArray(components)],
  exports: [
    components.DialogComponent
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
