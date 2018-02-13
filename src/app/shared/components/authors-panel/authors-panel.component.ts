import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

// https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html#demos

// export function createCounterRangeValidator(maxValue, minValue) {
//   return (c: FormControl) => {
//     const err = {
//       rangeError: {
//         given: c.value,
//         max: maxValue || 10,
//         min: minValue || 0
//       }
//     };
//
//     return (c.value > +maxValue || c.value < +minValue) ? err : null;
//   };
// }

@Component({
  selector: 'amp-authors-panel',
  templateUrl: './authors-panel.component.html',
  styleUrls: ['./authors-panel.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AuthorsPanelComponent), multi: true },
  ]
})
export class AuthorsPanelComponent implements ControlValueAccessor {
  _counterValue = {};

  propagateChange: any = () => {};

  get counterValue() {
    return this._counterValue;
  }

  set counterValue(val) {
    this._counterValue = val;
    this.propagateChange(val);
  }

  writeValue(value) {
    if (value) {
      this.counterValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
