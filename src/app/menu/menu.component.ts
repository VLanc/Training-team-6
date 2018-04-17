import { Component, OnInit, } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('openClose', [
      state('collapsed, void', style({
        transform: 'translateX(0)'
      })),
      state('expanded',   style({
        transform: 'translateX(174px)'
      })),
      transition('expanded <=> collapsed', animate('300ms ease-out'))
    ])
  ]
})
export class MenuComponent implements OnInit {
  visible: boolean = false;
  stateExpression: string = 'collapsed';
  constructor() { }

  ngOnInit() {
  }

  toggle = () => {
    this.visible = !this.visible;
    this.stateExpression = this.stateExpression === 'expanded' ? 'collapsed': 'expanded';
    console.log(this.stateExpression);
  }
}
