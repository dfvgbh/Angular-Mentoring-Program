import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator } from '@angular/forms';

export function isEmptyValidator(c: FormControl) {
  return c.value.length > 0 ? null : { empty: true };
}

@Component({
  selector: 'amp-authors-panel',
  templateUrl: './authors-panel.component.html',
  styleUrls: ['./authors-panel.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AuthorsPanelComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AuthorsPanelComponent), multi: true }
  ]
})
export class AuthorsPanelComponent implements ControlValueAccessor, Validator {
  @Input() authorsList = [];

  _authors = [];
  propagateChange: any = () => {};

  get authors() {
    return this._authors;
  }

  set authors(val) {
    this._authors = val;
    this.propagateChange(val);
  }

  writeValue(value) {
    if (value) {
      this.authors = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  onCheckedChange(event, author) {
    if (event.target.checked) {
      this.authors = [...this.authors, author];
    } else {
      this.authors = this.authors.filter(item => item !== author);
    }
  }

  validate(c: FormControl) {
    return isEmptyValidator(c);
  }
}
