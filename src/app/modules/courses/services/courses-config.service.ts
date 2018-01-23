import { Injectable } from '@angular/core';
import { CoursesRequestParams } from '../models/courses-request-params.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { DEFAULT_PAGE_SIZE, PAGES_START_FROM} from '../courses.constants';

@Injectable()
export class CoursesConfigService {
  private config: CoursesRequestParams = {
    pageSize: DEFAULT_PAGE_SIZE,
    page: PAGES_START_FROM
  };
  private config$ = new BehaviorSubject<CoursesRequestParams>(this.config);

  constructor() { }

  getConfig$(): Observable<CoursesRequestParams> {
    return this.config$.asObservable();
  }

  setConfig(config: CoursesRequestParams) {
    Object.assign(this.config, config);
    this.broadcastConfig();
  }

  getHttpConfig(): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(this.config).forEach(key => {
      httpParams = httpParams.set(key, this.config[key]);
    });

    return httpParams;
  }

  private broadcastConfig(): void {
    this.config$.next(this.config);
  }
}
