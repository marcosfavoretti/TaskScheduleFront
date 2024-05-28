import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValuePrinter'
})
export class KeyValuePrinterPipe implements PipeTransform {
  transform(value: any): string {
    if (!value || typeof value !== 'object') {
      return '';
    }

    let result = '';
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result += `${key}: ${JSON.stringify(value[key], null, 2)}\n`;
      }
    }
    return result;
  }
}
