//Animacion 

import { animate, state, style, transition, trigger } from '@angular/animations';

export const fundido =
    trigger('fundido',[
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'opacity(-30%)'
            }),
            animate('300ms linear',
            style({
                opacity: 44
            }))
        ]),
    ]);
