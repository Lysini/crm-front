import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import { routes } from "@globals/home.routes";

import { withStyles } from '@material-ui/core/styles';

import { styles } from '@styles/app.template.styles'

import { AppHeader } from './AppHeader'
import { AppDrawer } from './AppDrawer'

import Protected from '@components/Protected'


@withRouter
@Protected
class HomeRouting extends React.Component {
  state = {
    open: true,
    mobileView: false
  };
  updateWindowDimensions = this.updateWindowDimensions.bind(this);

  handleDrawerOpen = () => {
    this.setState({ open: true, openMobile: false });
  };

  handleDrawerClose = () => {
    this.setState({ open: false, openMobile: false });
  };

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    if(window.innerWidth <= 1024 && !this.state.mobileView){
      this.setState({ mobileView: true });
      this.handleDrawerClose()
    }
    if(window.innerWidth > 1024 && this.state.mobileView){
      this.setState({ mobileView: false });
      this.handleDrawerOpen()
    }
  }

  render() {
    const { classes } = this.props;
    const { open, mobileView } = this.state;
    return (
      <div className={classes.root}>
        
        <AppHeader 
          handleDrawerOpen={this.handleDrawerOpen} 
          {...this.props} 
          open={open} 
          logout={() => this.props.authStore.logout()}
          mobileView={mobileView}
        />

        <AppDrawer
          handleDrawerClose={this.handleDrawerClose} 
          open={open} 
          classes={classes}
          theme={this.props.theme}
          mobileView={mobileView}
          logout={() => this.props.authStore.logout()}
        /> 

        <main
          className={`flex justify-content-center align-items-center header-margin-top 
            ${classNames(classes.content, classes.content, {
            [classes.contentShift]: open && !mobileView,
          })}`}
          style={{
            position: mobileView && "absolute",
            right: mobileView && "0px",
            width: mobileView && "100%",
            height: mobileView && "90%",
          }}
        >
          <Routing />
        </main>
      </div>
    );
  }
}


HomeRouting.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

@withRouter
class Routing extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.location.pathname === this.props.location.pathname){
      return false
    }
    return true
  }

  render(){
    return (
      <Switch>
        {routes.map((route, index) => {
          if(route.type === "route"){
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                component={route.component}
              />
            );
          }
        })}
        <Redirect
          from={"/"}
          to={"/app/home"}
        />
      </Switch>
    )
  }
}

export default withStyles(styles, { withTheme: true })(HomeRouting);