import React, {Component} from 'react';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {
    withStyles,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Menu,
    MenuItem

} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import {
    AccountCircle
} from '@material-ui/icons';
import Util from './../../lib/Util';

import "./HeaderMenu.css"

const styles = theme => ({
    flex: {
        flex: 1,
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        }
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        }
    }
});

const drawerWidth = 240;





class Header extends Component {

    constructor (props){
        super(props);
    }

    state = {
        auth: true,
        anchorEl: null,
    };
    AuthenicatedMenuItem = [
        {label : 'Profile' , function :() => this.handleClose() },
        {label : 'My Account' , function :() => this.handleClose() },
        {label : 'Logout' , function :() => this.handleLogout() },
    ]
    menuItem = [
        {label : 'Login' , function :() => this.handleLogin() }
    ]
    handleChange = (event, checked) => {
        this.setState({auth: checked});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleLogout = () => {
        Util.destroyToken();
        this.setState({anchorEl: null});
        this.props.history.push('/login');
    }
    handleLogin = () => {
        this.setState({anchorEl: null});
        this.props.history.push('/login');
    }
    render() {
        const {classes} = this.props;
        const {auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const menuData = Util.isAuthenticated() ? this.AuthenicatedMenuItem : this.menuItem;

        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerToggle}
                        className={classes.navIconHide}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        GS Desk
                    </Typography>
                        <div className="headerMenu">
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >

                            {menuData.map((menu, index) =>
                                <MenuItem key={index} onClick={menu.function}>{menu.label}</MenuItem>
                            )}
                                
                            </Menu>
                        </div>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(withRouter(Header));