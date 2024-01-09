import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-register-info';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-item.component.html',
  styleUrls: ['./login-item.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup | null = null;
  registerForm:FormGroup;
  showLoginForm:Boolean = true;
  showRegisterForm:Boolean = false;
  @Input() username: string = '';
  @Input() password: string = '';
  @Input() email:    string = '';
  @Input() name:     string = '';
  @Input() surname:  string = '';
  @Input() nickname: string = '';
  @Output() onsubmit = new EventEmitter<UserCredentials>();
  @Output() onregistersubmit = new EventEmitter<UserRegisterInfo>();
  constructor(private formBuilder: FormBuilder) {
    //Construye el formulario de login con los siguientes parámetros
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    //Construye el formulario de registro con los siguientes parámetros
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email:    ['', [Validators.required]],
      password:['', [Validators.required]],
      surname:['', [Validators.required]],
      name:['', [Validators.required]]
    });
  }
  ngOnInit() {}

  //Emite los datos introducidos en el formulario de login
  onSubmit() {
    this.onsubmit.emit(this.form?.value);
    this.form?.controls['password'].setValue('');
  }

  //Cambia de un formulario a otro
  toggleForms() {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterForm = !this.showRegisterForm;
  }

    //Emite los datos introducidos en el formulario de registro
  onRegisterSubmit() {
    this.onregistersubmit.emit(this.registerForm.value);
  }
}
