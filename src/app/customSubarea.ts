import { Pipe, PipeTransform } from '@angular/core';
import { label_strings } from './charter/charter.component';
@Pipe({ name: 'customsubarea' })
export class Customsubarea implements PipeTransform {
    public result = '';
    transform(value: string): string {
        switch (value) {
            case 'S1':
                return label_strings.S1;
            case 'S2':
                return label_strings.S1;
            case 'S3':
                return label_strings.S1;
            case 'S4':
                return label_strings.S1;
            case 'S5':
                return label_strings.S1;
            case 'S6':
                return label_strings.S1;
            case 'S7':
                return label_strings.S1;
            case 'S8':
                return label_strings.S1;
            default:
                break;
        }
    }
}
