import { trigger, transition, query, style, animate, group } from '@angular/animations';


export const slider = trigger( 'routeAnimations',[
    transition('*=>*',slideTo('left'))
]);

function slideTo(direction){
const opt = {optional:true};
    return[
        query(':enter,:leave',[
            style({
                position:'absolute',
                [direction]:0,
                width:'100%'
            })
        ],opt),
        query(':enter',[
            style({[direction]:'-100%',opacity:0})
        ],opt),
        group([
            query(':leave',[
                animate('800ms ease',style({[direction]:'100%',opacity:0}))
            ],opt),
            query(':enter',[
                animate('600ms ease-in',style({[direction]:'0%',opacity:1}))
            ],opt)
        ])
    ]
}