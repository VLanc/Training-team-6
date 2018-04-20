import {Component} from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('openClose', [
      state('collapsed, void', style({
        transform: 'translateX(0)'
      })),
      state('expanded', style({
        transform: 'translateX(174px)'
      })),
      transition('expanded <=> collapsed', animate('300ms ease-out'))
    ])
  ]
})
export class AppComponent {
  visible = false;
  stateExpression = 'collapsed';
  title = 'app';
  toggle = () => {
    if ( window.screen.availWidth < 993) {
      this.visible = !this.visible;
      this.stateExpression = this.stateExpression === 'expanded' ? 'collapsed' : 'expanded';
    }
  }
}
