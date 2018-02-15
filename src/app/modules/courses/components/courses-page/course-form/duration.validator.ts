import { FormControl } from '@angular/forms';

export function durationValidator(c: FormControl) {
  const pattern = /^\d*$/;
  const err = {
    durationFormat: {
      given: c.value
    }
  };

  return c.value.toString().search(pattern) === - 1 ? err : null;
}
