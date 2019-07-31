import React from "react";
import { withRouter } from "react-router-dom";
import {
    inject, 
    observer
} from 'mobx-react';

import CircularProgress from '@material-ui/core/CircularProgress';

import {
    ProfileContent
} from './components'

import {
    ErrorPanel,
    InfoPanel
} from '@uiparts'


@withRouter
@inject("advisorProfileStore")
@observer
class AdvisorProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.advisorProfileStore.shouldIFetch){
            this.props.advisorProfileStore.getAdvisor()
        }
    }

    render() {
        let {
            advisorProfileStore
        } = this.props

        if(advisorProfileStore.imBusy){
            return (
                <div className="full-width flex align-items-center justify-content-center pt-3 pb-3">
                    <CircularProgress size={60} disableShrink /> 
                </div>
            )
        }
        if(advisorProfileStore.imWithError){
            return (
                <div className="full-width full-height flex justify-content-center pt-3 pb-3">
                    <div className="full-width">
                        <ErrorPanel message={advisorProfileStore.error} onClick={() => advisorProfileStore.getAdvisor()} />
                    </div>
                </div>
            )
        }
        if(advisorProfileStore.noAdvisor){
            return (
                <div className="full-width full-height flex justify-content-center pt-3 pb-3">
                    <div className="full-width">
                        <InfoPanel message={"Nie posiadasz opiekuna, jesteś administratorem."} />
                    </div>
                </div>
            )
        }
        return (
            <div className="animated fadeIn flex flex-column advisor-profile-window-container">
                <div className="advisor-profile">
                    {advisorProfileStore.advisor && <ProfileContent />}
                </div>
            </div>
        );
    }
} 

export default AdvisorProfile