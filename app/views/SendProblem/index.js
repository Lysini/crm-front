import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import {
    inject, 
    observer
} from 'mobx-react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import {
    SendProblemHeader,
    ServiceDescription,
    FormStepper,
    SuccessText
} from './components'

import {
    ProblemForm,
    PersonalDataForm,
    FirmDataForm,
    EstateDataForm,
    BusinessPlanForm,
    BIKFileForm,
    ContactForm
} from './Forms/'

import {
    buttonStyles
} from '@styles/button.styles'

import {
    steps
} from './steps'


const getFormSteps = (problemType) => {
    if(problemType !== ""){
        return steps[problemType]
    }

    return []
}


@withRouter
@inject("sendProblemStore")
@observer
class SendProblem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: "problem_type"
        };
    }

    render() {
        let {
            classes,
            sendProblemStore
        } = this.props
        
        let {
            activeStep
        } = this.state

        return (
            <div className="full-height flex auth-view-container justify-content-center align-items-center">
                { sendProblemStore.currentView === "info" && 
                    <div className="flex-column gold-border bg-white send-problem-window-container animated fadeIn">
                        <SendProblemHeader currentView={sendProblemStore.currentView} />
                                
                        <ServiceDescription />
            
                        <Button 
                            variant="contained"
                            onClick={() => sendProblemStore.currentView = "form"}
                            className={`${classes.success} mt-0 width-90 mr-auto ml-auto`}
                        >Zgłoś swój problem</Button>

                        <Link 
                            className="btn p-0 width-90 ml-auto mr-auto" 
                            style={{ marginTop: 10, marginBottom: 40 }} 
                            to={'/log-in'}
                        >
                            <Button
                                className="custom-btn-gold"
                                variant={'contained'}
                                fullWidth={true}
                            >
                                Logowanie do aplikacji
                            </Button>
                        </Link>
                    </div>
                }
                { sendProblemStore.currentView === "form" && 
                    <div className="problem-form animated fadeIn">
                        <div className="flex-column full-width bg-white ml-auto mr-auto gold-border send-problem-window-container">
                            <SendProblemHeader currentView={sendProblemStore.currentView} />

                            <div className="width-90 ml-auto mr-auto">
                                { activeStep === "problem_type" && <ProblemForm /> }
                                { activeStep === "personal_data" && <ContactForm /> }
                                { activeStep === "contact_data" && <ContactForm /> }
                                { activeStep === "estate_data" && <EstateDataForm /> }
                                { activeStep === "firm_data" && <FirmDataForm /> }
                                { activeStep === "business_plan" && <BusinessPlanForm /> }
                                { activeStep === "bik_file" && <BIKFileForm /> }
                            </div>

                            {sendProblemStore.problem.problemType.type !== "" &&
                                <FormStepper 
                                    options={[...steps.basic, ...getFormSteps(sendProblemStore.problem.problemType.type)]}
                                    activeStep={activeStep} 
                                    changeStep={(e) => this.setState({ activeStep: e })}
                                    problemType={sendProblemStore.problem.problemType.type}
                                />
                            }
                            

                            {sendProblemStore.imWithError &&
                                <Typography 
                                    className="text-center" 
                                    variant="subtitle2" 
                                    color="inherit" 
                                    style={{color: 'red'}}
                                >
                                    {sendProblemStore.error}
                                </Typography>
                            }

                            <Button
                                style={{ marginTop: 10}} 
                                className={`${classes.success} width-90 ml-auto mr-auto`}
                                variant={'contained'}
                                onClick={() => sendProblemStore.sendProblem(() => this.setState({activeStep: "problem_type"}))}
                                disabled={sendProblemStore.imBusy}
                            >
                                Wyślij zgłoszenie
                                {sendProblemStore.imBusy && <CircularProgress size={20} className={`${classes.circleProgressSuccess} ml-3`} />}
                            </Button>

                            <Link 
                                className="btn p-0 width-90 ml-auto mr-auto" 
                                style={{ marginTop: 10, marginBottom: 40 }} 
                                to={'/log-in'}
                            >
                                <Button
                                    className="custom-btn-gold"
                                    variant={'contained'}
                                    fullWidth={true}
                                >
                                    Logowanie do aplikacji
                                </Button>
                            </Link>
                        </div>
                    </div>
                }

                { sendProblemStore.currentView === "send_success" && 
                    <div className="flex-column bg-white gold-border send-problem-window-container animated fadeIn">
                        <SendProblemHeader currentView={sendProblemStore.currentView} />
                                
                        <SuccessText />

                        <Button 
                            className={`${classes.success} mt-0 width-90 mr-auto ml-auto`}
                            variant="contained"
                            onClick={() => sendProblemStore.currentView = "info"}
                            style={{marginTop: 10, marginBottom: 40}}
                        >Powrót</Button>
                    </div>
                }
            </div>
        );
    }
} 

export default withStyles(buttonStyles)(SendProblem)