import { Component, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator } from '@angular/forms';

@Component({
  selector: 'amp-course-date-input',
  template: `<input [(ngModel)]="date"
                    type="text">`,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CourseDateInputComponent), multi: true }
  ]
})
export class CourseDateInputComponent implements ControlValueAccessor  {
  _date: string;
  propagateChange: any = () => {};

  get date() {
    return this._date;
  }

  set date(val: string) {
    this._date = val;
    this.propagateChange(this.getFormattedDate(val));
  }

  writeValue(value) {
    if (value) {
      this.date = `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  private getFormattedDate(string: string): Date {
    const pattern = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d\d$/;

    if (string.search(pattern) === - 1) {
      return null;
    } else {
      const dateTokens = string.split('/');
      return new Date(+dateTokens[2], +dateTokens[1], +dateTokens[0]);
    }
  }
}
