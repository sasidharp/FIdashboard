import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'customdate' })
export class Customdatepipe implements PipeTransform {
    public result = '';
    transform(value: string): string {
        if (value) {
            return this.result.concat(value.substr(4, 2), '/', value.substr(6, 2), '/', value.substr(0, 4));

        } else {
            return '';
        }
    }
}
