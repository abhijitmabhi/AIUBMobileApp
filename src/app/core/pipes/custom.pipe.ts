import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customYearOfService'
})
export class CustomPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '' || value === null) {
      return '';
    }
  return value.replace(/\d+/g, "<br>"+"$&").trim();
  }
}