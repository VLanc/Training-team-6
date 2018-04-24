import { Component, OnInit, Input } from '@angular/core';
import {AuthServeces} from '../../shared/services/auth.serveces';
import {Router} from '@angular/router';


@Component({
  selector: 'app-up-bar',
  templateUrl: './up-bar.component.html',
  styleUrls: ['./up-bar.component.css']
})
export class UpBarComponent implements OnInit {
  @Input() public toggle: () => void;
  constructor(private authService: AuthServeces,
              private router: Router
              ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
