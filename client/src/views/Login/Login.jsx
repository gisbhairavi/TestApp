import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
    withStyles,
    IconButton,
    Button,
    Input,
    InputLabel,
    FormControl,
    InputAdornment,
    TextField,
    Paper,
    Typography,
    Grid
} from '@material-ui/core';
import Pattern from 'lib/Patterns';

import {
    Router
} from 'react-router-dom';

import api from 'lib/Api';
import { toast } from 'react-toastify';

import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        float: 'right',
    },
    input: {
        display: 'none',
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        flexBasis: 200
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    }
});

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showPassword: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = prop => event => {
        console.log(prop);
        console.log(event.target.value);

        this.setState({[prop]: event.target.value});
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handleSubmit(event) {
        event.preventDefault();

        let postData = {
            email: this.state.email,
            password: this.state.password
        }

        try {
            console.log(this , "THISSS")

            if (!postData.email || !(Pattern.email).test(postData.email)) {
                throw "Provide valid email";
            }

            if (!postData.password) {
                throw "Provide password";
            }

            api.post('api/auth/login', postData).then((result) => {
                console.log(result);
                if(result.status === 200 && result.data && result.data.auth_token) {
                    localStorage.setItem("auth_token", result.data.auth_token);
                    api.defaults.headers.common['x-access-token'] = result.data.auth_token;
                    toast.success("Successfully Logged");
                    this.props.history.push('/profile');
                } else {
                    throw "Please check the username & passsword";
                }
            }).catch(e => {
                console.log(e, "ERROR")
                toast.error("Error: " + e)
            })
        } catch (e) {
            console.log(e, "ERROR")
            toast.error("Error: " + e)
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item sm>
                        <Paper className={classes.paper}>
                            <Typography variant="headline" component="h3">
                                Login
                            </Typography>
                            <form onSubmit={this.handleSubmit}>
                                <Grid container spacing={0}>
                                    <Grid item sm={12}>
                                        <Grid item sm={6}>
                                            <TextField
                                                id="email"
                                                label="Email"
                                                className={classes.textField}
                                                value={this.state.email}
                                                fullWidth
                                                onChange={this.handleChange('email')}
                                                error={this.state.errorEmail}
                                                helperText={this.state.errorText}
                                                margin="normal"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item sm={12}>
                                        <Grid item sm={6}>
                                            <FormControl fullWidth
                                                className={classNames(classes.margin, classes.textField, classes.formControl)}>
                                                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                                <Input
                                                    id="adornment-password"
                                                    type={this.state.showPassword ? 'text' : 'password'}
                                                    value={this.state.password}
                                                    onChange={this.handleChange('password')}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="Toggle password visibility"
                                                                onClick={this.handleClickShowPassword}
                                                                onMouseDown={this.handleMouseDownPassword}
                                                            >
                                                                {this.state.showPassword ? <VisibilityOff/> :
                                                                    <Visibility/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={6} style={{marginTop:20}}>
                                        <Button variant="raised" color="primary" className={classes.button} onClick={this.handleSubmit}>
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(Login);