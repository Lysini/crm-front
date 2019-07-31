import React from "react";

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';


export const FormStepper = (props) => {
    let {
        activeStep,
        changeStep,
        options,
        problemType
    } = props
    return (
        <Stepper 
            className="width-90 mr-auto ml-auto mb-10"  
            alternativeLabel 
            nonLinear 
            activeStep={options.map(function(e) { return e.name; }).indexOf(activeStep)}
        >
            {options.map((step, index) => {
                const stepProps = {};
                const buttonProps = {};
                if (step.name === "firm_data" && problemType !== "credit") {
                    buttonProps.optional = <Typography variant="caption">Opcjonalnie</Typography>;
                }
                return (
                    
                    <Step key={index} {...stepProps}>
                        <StepButton
                            onClick={() => changeStep(step.name)}
                            completed={false}
                            {...buttonProps}
                        >
                            {step.label}
                        </StepButton>
                    </Step>
                    
                );
            })}
        </Stepper>
    )
}



export const SendProblemHeader = (props) => {
    return (
        <div className="text-center">
            <img className="width-65 p-3" src={'/images/logo_czarne.png'} />
            
            { props.currentView === "form" && 
                <Typography variant="subtitle1" color="inherit" className="mr-3 ml-3 mb-3">
                    Wypełnij formularz i prześlij nam zgłoszenie.
                </Typography>
            }
            <Divider className="mb-2 gold-divider" />
        </div>
    )
}

export const ServiceDescription = () => {
    return (
        <div className="m-4">
            <Typography variant="h6" color="inherit">
                Pomożemy Ci rozwiązać każdy problem finansowy.
            </Typography>
            <Typography variant="subtitle1" color="inherit">
                Fusce quis iaculis magna, convallis luctus neque. Vivamus vel placerat enim. Suspendisse ac pellentesque libero. Mauris eu sagittis mauris. Ut velit dui, hendrerit vel tincidunt sit amet, fringilla non erat. Ut ultricies mi diam, quis molestie tellus condimentum id. Quisque sit amet magna tincidunt, mattis diam ac, pellentesque turpis. Donec condimentum ante ut hendrerit venenatis. Sed viverra egestas eros id gravida.            
            </Typography>
        </div>
    )
}

export const SuccessText = () => {
    return (
        <div style={{ marginTop: 10, marginBottom: 40 }}  className="m-4">
            <Typography variant="h6" color="inherit">
                Zgłoszenie zostało wysłane pomyślnie.
            </Typography>
            <Typography variant="subtitle1" color="inherit">
                Gdy tylko ktoś z naszych pracowników przyjmnie Twoje zgłoszenie zostaniesz o tym poinformowany.            
            </Typography>
        </div>
    )
}