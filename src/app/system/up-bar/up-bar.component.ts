import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-up-bar',
  templateUrl: './up-bar.component.html',
  styleUrls: ['./up-bar.component.css']
})
export class UpBarComponent implements OnInit {
  @Input() public toggle: () => void;
  constructor() { }

  ngOnInit() {
  }

}
