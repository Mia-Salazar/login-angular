import { Component, OnInit } from '@angular/core';
import { User } from '../../models/usuario.model'
import { NgForm } from '@angular/forms'
import { AuthService } from '../../services/auth.service'


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: User
  mailAlreadyExists = false
  rememberMe = false


  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = new User()
  }

  signUp(form:NgForm){
    console.log(this.user)

    if (form.invalid) {
      console.log(form)
    } else {
      this.auth.singUp(this.user)
        .subscribe( resp => {
          if (this.rememberMe = true) {
            localStorage.setItem('email', this.user.email)
          }
          console.log(resp)
        }, e => {

          if (e.error.error.message == 'EMAIL_EXISTS') {
            this.mailAlreadyExists = true
          }

        })

    }
  }


}
