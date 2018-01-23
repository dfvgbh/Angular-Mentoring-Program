import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as components from './components';
import * as services from './services';
import { AuthorizedHttpClientInterceptor } from './services/interceptors/authorized-http-client.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function toArray(obj) {
  return Object.values(obj);
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizedHttpClientInterceptor,
      multi: true
    },
    ...toArray(services)
  ],
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
