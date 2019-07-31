import PropTypes from 'prop-types'
import React from 'react';
import { HashRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from "mobx-react";
import { Route } from 'react-router-dom';

import { routes } from "@globals/main.routes";
import { palette } from "@globals/palette";

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

const theme = createMuiTheme({
    palette: palette,
    typography: {
        useNextVariants: true,
    },
});

export default function Root({stores, history}) {
    return (
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Provider {...stores}>
                    <HashRouter>
                        <div style={{height: "100%"}}>
                            <CssBaseline />
                            {routes.map((route, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        component={route.component}
                                    />
                                );
                            })}
                        </div>
                    </HashRouter>
                </Provider>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}

Root.propTypes = {
    stores: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}