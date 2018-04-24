import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
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
export class SystemComponent  implements OnInit {
  visible = false;
  stateExpression = 'collapsed';
  constructor(private router: Router) {
  }
  ngOnInit() {
    // this.router.navigate(['./interview']); /*TODO изменить на /cabinet*/
  }
  toggle = () => {
    if ( window.screen.availWidth < 993) {
      this.visible = !this.visible;
      this.stateExpression = this.stateExpression === 'expanded' ? 'collapsed' : 'expanded';
    }
  }
}
