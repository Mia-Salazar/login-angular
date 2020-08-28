import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/usuario.model'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_KEY = 'AIzaSyCUA8OXgkywzVZ2v9vtkXMdMJLS7ux3UWw'
  private userToken:string 
  constructor(private http:HttpClient) { 
    this.readToken()

  }

  singUp(usuario: User) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken : true
    }
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, authData).pipe(
      map(res => {
        this.saveToken(res['idToken']);
        return res
      })
    )
  }

  login(usuario: User){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken : true
    }
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, authData).pipe(
      map(res => {
        this.saveToken(res['idToken']);
        return res
      })
    )
  }

  private saveToken(idToken:string) {
    let date = new Date()
    let dateExpired = date.setSeconds(3600).toString()
    this.userToken = idToken
    localStorage.setItem('token', idToken)
    localStorage.setItem('expire', dateExpired)
  }

  readToken(){
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    } else {
      this.userToken = ''
    }
    return this.userToken
  }

  isAuthenticated():boolean{
    const expire = Number(localStorage.getItem('expire'))
    const expireDate = new Date()
    expireDate.setTime(expire)
    if (this.userToken.length < 2 ){
      return false
    } 
    if (expireDate > new Date){
      return false
    } 
    
    
    return true

  }

  logout(){
    localStorage.removeItem('token')
  }
}
