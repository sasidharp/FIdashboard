import { Pipe, PipeTransform } from '@angular/core';
export enum jobstatus {
    A = 'Aborted',
    Y = 'Ready',
    P = 'Scheduled',
    S = 'Released',
    R = 'Running',
    F = 'Finished',
    Z = 'Putactive',
    X = 'Unknown State'
}

// btc_running LIKE tbtco-status VALUE 'R',
// btc_ready LIKE tbtco-status VALUE 'Y',
// btc_scheduled LIKE tbtco-status VALUE 'P',
// btc_released LIKE tbtco-status VALUE 'S',
// btc_aborted LIKE tbtco-status VALUE 'A',
// btc_finished LIKE tbtco-status VALUE 'F',
// btc_put_active LIKE tbtco-status VALUE 'Z',
// btc_unknown_state LIKE tbtco-status VALUE 'X'.
@Pipe({ name: 'customjob' })
export class Customjobstatus implements PipeTransform {
    public result = '';
    transform(value: string): string {
        switch (value) {
            case 'R':
                return jobstatus.R;
            case 'Y':
                return jobstatus.Y;
            case 'P':
                return jobstatus.P;
            case 'S':
                return jobstatus.S;
            case 'A':
                return jobstatus.A;
            case 'F':
                return jobstatus.F;
            case 'Z':
                return jobstatus.Z;
            case 'X':
                return jobstatus.X;
            default:
                break;
        }
    }
}
