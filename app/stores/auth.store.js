import { observable, action } from "mobx";
import APIs from '@api';

import {
  emailValidation,
  passwordValidation
} from '@utils'

class AuthStore {

  @observable imAuth = false;
  @observable imWithErrorLogin = false;
  @observable errorLogin = "";
  @observable imWithErrorRemindPassword = false;
  @observable errorRemindPassword = "";
  @observable authData = {};
  @observable imBusy = false;
  @observable loginForm = {
    email: "",
    password: ""
  };
  @observable loginFormValidation = {
    emailError: "",
    passwordError: ""
  };
  @observable remindPasswordForm = {
    email: ""
  };
  @observable remindPasswordFormValidation = {
    emailError: ""
  };

  constructor() {
  }

  @action
  changeValue(property, new_value) {
    this[property] = new_value;
  }

  @action
  clearLoginForm(){
    this.loginForm = {
      email: "",
      password: ""
    };
  }

  @action
  clearRemindPasswordForm(){
    this.remindPasswordForm = {
      email: ""
    };
  }

  @action
  isLoginFormCorrect(){
    if(this.loginFormValidation.emailError.length > 0){
      return false
    }
    if(this.loginFormValidation.passwordError.length > 0){
      return false
    }
    return true
  }

  @action
  login() {
    this.imBusy = true;

    this.loginFormValidation.emailError = emailValidation(this.loginForm.email)
    this.loginFormValidation.passwordError = passwordValidation(this.loginForm.password)

    if(this.isLoginFormCorrect()){
      return APIs
      .users
      .login(this.loginForm.email, this.loginForm.password)
      .then((data) => {
          if(data.statusCode < 200 || data.statusCode >= 300){
            throw data
          }
          console.log('login success', data);
          localStorage.setItem("authData", JSON.stringify(data.data))
          localStorage.setItem("imAuth", 'true')
          this.clearLoginForm()
          this.imAuth = true
          this.authData = data.data;
          this.imWithErrorLogin = false;
          this.imBusy = false;
      })
      .catch((errors) => {
          console.log('login errors', errors);
          this.errorLogin = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
          this.imWithErrorLogin = true;
          this.imBusy = false;
      });
    } else {
      this.imBusy = false
    }
  }

  @action
  remindPassword() {
    this.imBusy = true;

    this.remindPasswordFormValidation.emailError = emailValidation(this.remindPasswordForm.email)

    if(this.isRemindPasswordFormCorrect()){
      return APIs
      .users
      .remindPassword(this.remindPasswordForm.email)
      .then((data) => {
          if(data.statusCode < 200 || data.statusCode >= 300){
            throw data
          }
          console.log('remindPassword success', data);
          this.clearRemindPasswordForm()
          this.imWithErrorRemindPassword = false;
          this.imBusy = false;
      })
      .catch((errors) => {
          console.log('remindPassword errors', errors);
          this.errorRemindPassword = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
          this.imWithErrorRemindPassword = true;
          this.imBusy = false;
      });
    } else {
      this.imBusy = false
    }
  }

  @action
  isRemindPasswordFormCorrect(){
    if(this.remindPasswordFormValidation.emailError.length > 0){
      return false
    }
    return true
  }

  @action
  logout() {
    this.imAuth = false;
    this.authData = {};
    localStorage.removeItem("authData")
    localStorage.removeItem("imAuth")
  }

}

export default AuthStore;
