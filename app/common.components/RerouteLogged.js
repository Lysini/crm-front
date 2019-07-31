import React from "react";
import { Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";


export default function RerouteLogged(Children) {
    @inject("authStore")
    @observer
    class ReroutedComponentHOC extends React.Component {

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
            return (
                <div className="authComponent full-height">
                    {localStorage.getItem("imAuth") !== 'true' ? (
                        <Children {...this.props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/app",
                            }}
                        />
                    )}
                    <div style={{display: 'none'}}>{this.props.authStore.imAuth}</div>
                </div>
            );
        }
    }
    return ReroutedComponentHOC;
}
