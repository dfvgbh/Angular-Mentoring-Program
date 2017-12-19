import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {

  transform(value: Array<any>, field: string): Array<any> {
    const result = value.slice();

    return result.sort((a, b) => {
      if (a[field] < b[field]) {
        return 1;
      } else if (a[field] > b[field]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
