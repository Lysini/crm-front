import React from 'react';
import {
    inject, 
    observer
} from 'mobx-react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const ProfileContent = inject("advisorProfileStore")(observer((props) => {
    let {
        advisorProfileStore
    } = props

    let {
        advisor
    } = advisorProfileStore
    
    return (
        <div className="flex-column p-4">
            <img
                className="advisor-profile-avatar"
                src="https://szkolabrzechwy.pl/userfiles/team/user.png"
            />
            <Typography 
                className="text-center text-nowrap advisor-profile-name-large-label" 
                variant="h3" 
                color="inherit" 
            >
                {`${advisor.firstName} ${advisor.lastName}`}
            </Typography>

            <Typography 
                className="text-center advisor-profile-name-mobile-label" 
                variant="h4" 
                color="inherit" 
            >
                {`${advisor.firstName} ${advisor.lastName}`}
            </Typography>

            { advisor.description &&
                <Typography 
                    className="text-left mt-2" 
                    variant="subtitle1" 
                    color="inherit" 
                >
                    {advisor.description}
                </Typography>
            }

            <Typography 
                className="text-left mt-2 advisor-profile-name-large-label" 
                variant="h5" 
                color="inherit" 
            >
                {`Email: ${advisor.email}`}
            </Typography>

            <Typography 
                className="text-left mt-2 advisor-profile-name-mobile-label" 
                variant="subtitle1" 
                color="inherit" 
            >
                {`Email: ${advisor.email}`}
            </Typography>

            <Typography 
                className="text-left advisor-profile-name-large-label" 
                variant="h5" 
                color="inherit" 
            >
                {`Telefon: ${advisor.phoneNumber}`}
            </Typography>

            <Typography 
                className="text-left advisor-profile-name-mobile-label" 
                variant="subtitle1" 
                color="inherit" 
            >
                {`Telefon: ${advisor.phoneNumber}`}
            </Typography>
            
            <Button 
                fullWidth
                variant="contained" 
                className="custom-btn-success mt-2"
                color="primary" 
                onClick={() => {}}
            >
                Wyślij prośbę o kontakt telefoniczny
            </Button>
        </div>
    )
}))