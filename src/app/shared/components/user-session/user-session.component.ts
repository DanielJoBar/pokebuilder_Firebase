import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.scss'],
})
export class UserSessionComponent  implements OnInit {
  logoff:boolean|null = false;
  @Input() username:string = "Username"
  @Output() onLogOffListener: EventEmitter<void> = new EventEmitter<void>()
  constructor() { }

  ngOnInit() {}
  ShowLogOff(){
    this.logoff = true;
  }
  OnLogOff(){
    this.onLogOffListener.emit()
    this.logoff = false
  }
}
