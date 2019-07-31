import React from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";


export default function Protected(Children) {
  @inject("authStore")
  @observer
  class AuthenticatedComponent extends React.Component {
    
    componentDidMount(){
      let imAuth = localStorage.getItem("imAuth")
      if(imAuth === 'true'){
        let authData = JSON.parse(localStorage.getItem("authData"))
        this.props.authStore.imAuth = true
        this.props.authStore.authData = authData
      } else {
        this.props.authStore.imAuth = false
      }
    }

    render() {
      const { imAuth } = this.props.authStore;
      return (
        <div className="authComponent" style={{ height: "100%" }}>
          {localStorage.getItem("imAuth") === 'true' ? (
            <Children {...this.props} />
          ) : (
            <Redirect
              to={{
                pathname: "/log-in",
                // state: { from: this.props.location }
              }}
            />
          )}
        </div>
      );
    }
  }
  return AuthenticatedComponent;
}
