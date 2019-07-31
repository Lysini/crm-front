import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {
    inject, 
    observer
} from 'mobx-react';

import moment from 'moment'
moment.locale('pl');

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import { routes } from "@globals/home.routes";
import { config } from "@globals/config"

@withRouter
@inject("authStore")
@observer
export class AppDrawer extends React.Component {
    render(){
        const { 
            classes, 
            theme, 
            open, 
            handleDrawerClose,
            location,
            mobileView,
            logout,
            authStore 
        } = this.props;

        let userPermission = authStore.authData.permission
        return (
            <Drawer
                className={`${classes.drawer}`}
                variant={!mobileView ? "persistent" : 'temporary'}
                anchor={!mobileView ? "left" : 'right'}
                onClose={() => {if(mobileView){handleDrawerClose()}}}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    {   mobileView
                        ?   <IconButton className="font-color-gold" onClick={handleDrawerClose}>
                                <ChevronRightIcon />
                            </IconButton>
                        :   <IconButton className="font-color-gold" onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                    }
                    
                </div>
                <Divider className="gold-divider" />

                <List className="pt-0">
                    { routes.map((route, k) => {
                        if(route.type === "title" && route.permissions.indexOf(userPermission) !== -1){
                            return (
                                <ListItem 
                                    key={k} 
                                >
                                    <ListItemText 
                                        primary={route.name} 
                                        primaryTypographyProps={{className: "font-color-dgray"}}
                                    />
                                </ListItem>
                            )
                        } else if (route.type === "route" && route.permissions.indexOf(userPermission) !== -1) {
                            return (
                                
                                <ListItem 
                                    key={k} 
                                    component={Link} 
                                    to={route.path} 
                                    button
                                    classes={{
                                        root: location.pathname === route.path && classes.listItemDisabled
                                    }}
                                    // style={{
                                    //     backgroundColor: location.pathname === route.path && 'red'
                                    // }}
                                    disabled={location.pathname === route.path}
                                    onClick={() => {if(mobileView){handleDrawerClose()}}}
                                >
                                    <Icon className={`${location.pathname !== route.path ? "font-color-gold" : "font-color-white"}`}>{route.icon}</Icon>
                                    <ListItemText 
                                        primary={route.name} 
                                        primaryTypographyProps={{className: "font-color-white"}}
                                    />
                                </ListItem>
                            )
                        }
                    })
                    }
                </List>

                {mobileView &&
                    <List className="pb-0">
                        <ListItem 
                            button
                            onClick={() => logout()}
                        >
                            <ListItemText primary={"Wyloguj"} />
                        </ListItem>
                    </List>
                }

                <Typography variant="subtitle2" color="inherit" className="text-center font-color-dgray">
                    {`Wersja: ${config.version}`}
                </Typography>
                <Typography variant="subtitle2" color="inherit" className="text-center font-color-dgray">
                    {`${moment(new Date(config.buildDate)).format('Do MMMM YYYY')}`}
                </Typography>
            </Drawer>
        )
    }
}