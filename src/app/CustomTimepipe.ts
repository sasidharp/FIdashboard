import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'customtime' })
export class CustomTimepipe implements PipeTransform {
    public result = '';
    transform(value: string): string {
        if (value) {
            return this.result.concat(value.substr(0, 2), ':', value.substr(2, 2), ':', value.substr(4, 2));
        } else {
            return '';
        }
    }
}
