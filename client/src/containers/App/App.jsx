import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import {
    Route,
    Switch,
    BrowserRouter
} from 'react-router-dom';

import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import appRoutes from 'routes/router';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    render() {
        const {classes} = this.props;

        console.log(this.props.match);

        return (
            <div className={classes.root}>
                <ToastContainer/>
                <Header/>
                <Sidebar handleDrawerToggle={this.handleDrawerToggle} mobileOpen={this.state.mobileOpen}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        {
                            appRoutes.map((prop, key) => {
                                return (
                                    <Route exact path={prop.path} component={prop.component} key={key}/>
                                );
                            })
                        }
                    </Switch>
                </main>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(App);