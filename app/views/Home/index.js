import React from "react";
import { withRouter } from "react-router-dom";
import Typography from '@material-ui/core/Typography';


@withRouter
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
    }

    render() {
        return (
            <div className="animated fadeIn full-width full-height flex flex-column align-items-center">
                <img className="width-45 mt-5" src={'/images/logo_czarne.png'} />

                <Typography 
                    className="text-center" 
                    variant="h4" 
                    color="inherit" 
                >
                    Witamy w aplikacji
                </Typography>
            </div>
        );
    }
} 

export default Home