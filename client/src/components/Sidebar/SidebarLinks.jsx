import React from 'react';
import {
    Link,
    NavLink
} from 'react-router-dom';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import Contacts from '@material-ui/icons/Contacts';
import LockOpen from '@material-ui/icons/LockOpen';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Face from '@material-ui/icons/Face';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Settings from '@material-ui/icons/Settings';
import classNames from 'classnames';
import Util from './../../lib/Util';
import image1 from 'logo.png';


const styles = theme => ({
    toolbar: theme.mixins.toolbar
});

class SidebarLinks extends React.Component {

    mainMenu = [
        {text: 'Home', icon: <HomeIcon/>, link: '/'},
        {text: 'Login', icon: <LockOpen/>, link: '/login'}
    ];

    authenticatedMenu = [
        {text: 'Home', icon: <HomeIcon/>, link: '/'},
        {text: 'Registration', icon: <Contacts/>, link: '/register'},
        {text: 'Profile', icon: <Face/>, link: '/profile'},
        {text: 'Settings', icon: <Settings/>, link: '/settings'},
        {text: 'Access', icon: <Fingerprint/>, link: '/access'},
        {text: 'User Management', icon: <SupervisorAccount/>, link: '/userManagement'},
    ]

    render() {
        const menu = Util.isAuthenticated() ? this.authenticatedMenu : this.mainMenu ;
        const {classes} = this.props;
        return (
            <div>
            <div className={classNames(classes.toolbar)}>
            <img src={image1} alt="react-boilerplate - Logo" style={{width: '206px',
                height: '59px'}}
            
        />
            </div>
           <Divider/>
            <div>
                <List>
                    {menu.map((menu, index) =>
                        <List component="nav" key={index} className={classes.menuItem}>
                            <ListItem button component={Link} to={menu.link}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.text}/>
                            </ListItem>
                        </List>
                    )}

                </List>
            </div>
            </div>
        );
    }
}

SidebarLinks.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(SidebarLinks);