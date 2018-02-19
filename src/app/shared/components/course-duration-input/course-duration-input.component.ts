import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, } from '@angular/forms';

@Component({
  selector: 'amp-course-duration-input',
  template: `<input [(ngModel)]="duration"
                    type="text">`,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CourseDurationInputComponent), multi: true }
  ]
})
export class CourseDurationInputComponent implements ControlValueAccessor  {
  _duration: string;
  propagateChange: any = () => {};

  get duration() {
    return this._duration;
  }

  set duration(val: string) {
    this._duration = val;
    this.propagateChange(this.formatValue(val));
  }

  writeValue(value) {
    if (value) {
      this.duration = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  private formatValue(string: string): number {
    const val = +string;
    return (isNaN(val) || string === '') ? null : val;
  }
}
