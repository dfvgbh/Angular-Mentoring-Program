import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(input: Array<any>, field: string, value: string): Array<any> {
    if (!value) {
      return input;
    }
    return input.filter(item => item[field].toString().includes(value));
  }
}
