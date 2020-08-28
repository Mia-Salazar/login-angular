import { Component, OnInit } from '@angular/core';
import { User } from '../../models/usuario.model'
import { NgForm, EmailValidator } from '@angular/forms'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User
  invalidPassword = false
  invalidEmail = false
  rememberMe = false

  constructor(private auth: AuthService) { 
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email')
      this.rememberMe = true
    }
  }

  ngOnInit() {
    this.user = new User()
  }

  Login(form:NgForm){
    console.log(this.user)

    if (form.invalid) {
      console.log(form)
    } else {
      this.auth.login(this.user)
        .subscribe( resp => {
          if (this.rememberMe = true) {
            localStorage.setItem('email', this.user.email)
          }
          console.log(resp)
        }, e => {

          if (e.error.error.message == 'INVALID_PASSWORD') {
            this.invalidPassword = true
          }

          if (e.error.error.message == 'EMAIL_NOT_FOUND') {
            this.invalidEmail = true
          }

        })
    }
  }

}
