import { FormControl } from '@angular/forms';

export function dateValidator(c: FormControl) {
  const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  const err = {
    dateFormat: {
      given: c.value
    }
  };

  return c.value.toString().search(pattern) === - 1 ? err : null;
}
