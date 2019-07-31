import React from 'react';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

export const AppHeader = (props) => {
    const { 
        classes, 
        theme, 
        open, 
        handleDrawerOpen, 
        logout,
        mobileView 
    } = props;
    return (
        <AppBar
            position="fixed"
            color="primary"
            className={`${classNames(classes.appBar, {
                [classes.appBarShift]: open && !mobileView
            })}`}
        >
            <Toolbar style={{padding: '0px !important'}} disableGutters={mobileView === true || (!mobileView && !open)} >
                {   !mobileView &&
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                }
                
                <Typography variant="h6" style={{paddingLeft: '0px !importants', color: 'white'}} className="ml-1" color="inherit" noWrap>
                    App Name
                </Typography>

                {   !mobileView &&
                        <Button 
                            onClick={() => logout()} 
                            style={{position: 'fixed', right: 0, color: 'white'}}
                            color="inherit"
                        >Wyloguj</Button> 
                }

                {   mobileView &&
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            style={{position: 'fixed', right: 0}}
                            onClick={handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                }
                      
            </Toolbar>
        </AppBar>
    )
}