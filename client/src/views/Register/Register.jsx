import React, {Component} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Roles} from 'lib/Roles';
import {withRouter} from 'react-router';
import api from 'lib/Api';
import Pattern from 'lib/Patterns';
import {
    TextField, Grid, MenuItem, Step, StepLabel,
    Button, Input, InputAdornment, IconButton,
    Select, FormControl, InputLabel, FormHelperText, Stepper,
    helperText, withStyles
} from '@material-ui/core';

import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons';

import { toast } from 'react-toastify';


const styles = theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    Step1root: {
        flexGrow: 1
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    textField: {
        flexBasis: 200,
    }
});

function getSteps() {
    return ['Company Details', 'Personal Details', 'Roles & Permissions'];
}

class Register extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    constructor() {
        super();
        console.log(this, 'This_Register');
        this.state = {
            name: '',
            address: '',
            website: '',
            fname: '',
            lname: '',
            email: '',
            mobile: '',
            userlevel: '',
            password: '',
            activeStep: 0,
            errorWebsite: false,
            errorAddress: false,
            errorpassword: false,
            errorName: false,
            passwordErrorMessage: "",
            addressMessage: "",
            nameMessage: ""
        };
    }

    state = {
        activeStep: 0,
    };

    registeraton() {
        const data = this.state;
        let postData = {
            company_name: data.name,
            company_address: data.address,
            website: data.website,
            fname: data.fname,
            lname: data.lname,
            password: data.password,
            email: data.email,
            userlevel: data.userlevel,
            mobile: data.mobile
        }

        api.post('api/company', postData).then((result) => {
            toast.success("User & Company Registered Successfully");
            this.props.history.push("/");
        }).catch(e => {
            console.log(e, "ERROR")
            toast.error("Error :" + e)
        })

    };

    handleNext = (event) => {
        const {
            activeStep, name, address, website, fname, lname,
            email, mobile, password, userlevel
        } = this.state;

        let error = false;

        let errorName, errorAddress, errorWebsite, errorfname, errorlname,
            errorpassword, erroremail, errorCondactNo, roleError = false;

        let nameMessage, addressMessage, websiteMessage, fnameErrorMessage, lnameErrorMessage,
            passwordErrorMessage, emailErrorMessage, condactNoErrorMessage = "";
        console.log(activeStep, "ACTIVESTATE")
        try {


            switch (activeStep) {
                case 0 :
                    if (!name || !address || !website) {
                        error = true;
                    }

                    if (!name) {
                        errorName = true;
                        nameMessage = "Name is Required"
                    }
                    if (!address) {
                        errorAddress = true;
                        addressMessage = "Address is Required"
                    }

                    if (!website) {
                        errorWebsite = true;
                        websiteMessage = "Website Address is Required"
                    }
                    if (error) {
                        throw {
                            errorName: errorName, errorAddress: errorAddress, errorWebsite: errorWebsite,
                            nameMessage: nameMessage, addressMessage: addressMessage, websiteMessage: websiteMessage
                        }
                    } else {
                        this.setState({activeStep: activeStep + 1})
                    }
                    break;
                case 1 :
                    if (!fname || !lname || !password) {
                        error = true;
                    }

                    if (!fname) {
                        errorfname = true;
                        fnameErrorMessage = "First Name is Required";
                    }

                    if (!lname) {
                        errorlname = true;
                        lnameErrorMessage = "Last Name is Required";
                    }

                    if (!password) {
                        errorpassword = true;
                        passwordErrorMessage = "Password is Required";
                    }

                    if (!email || !(Pattern.email).test(email)) {
                        error = true;
                        erroremail = true;
                        emailErrorMessage = !email ? "Email is Required" : "Provide Valid Mail Address";
                    }

                    if (!mobile || !(Pattern.mobileNo).test(mobile)) {
                        error = true;
                        errorCondactNo = true;
                        condactNoErrorMessage = !mobile ? "Condact No is Required" : "Provide 10 Digit Number"
                    }

                    if (error) {
                        throw {
                            errorfname: errorfname,
                            errorlname: errorlname,
                            errorpassword: errorpassword,
                            erroremail: erroremail,
                            errorCondactNo: errorCondactNo,
                            fnameErrorMessage: fnameErrorMessage,
                            lnameErrorMessage: lnameErrorMessage,
                            passwordErrorMessage: passwordErrorMessage,
                            emailErrorMessage: emailErrorMessage,
                            condactNoErrorMessage: condactNoErrorMessage
                        }
                    } else {
                        this.setState({activeStep: activeStep + 1})
                    }
                    break;
                case 2 :
                    if (!userlevel) {
                        error = true;
                        roleError = true;
                    }

                    if (error) {
                        throw {
                            roleError: roleError
                        }
                    }

                    this.registeraton();
                    break;
            }

        } catch (e) {
            console.log(e, "ERRPR")
            this.setState(e)
        }

    };

    setStep(step) {
        this.setState({
            activeStep: step + 1,
        });
    }

    handleBack = () => {
        const {activeStep} = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };


    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handleChange = data => event => {
        if (data === 'userlevel') {
            this.setState({
                roleError: false
            })
        }
        this.setState({
            [data]: event.target.value
        })
    }

    render() {
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    <div style={{backgroundColor: '#fff'}}>
                        {activeStep === 0 && (
                            <div className={classes.Step1root}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={6} style={{margin: 'auto'}}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            error={this.state.errorName}
                                            className={classes.textField}
                                            value={this.state.name}
                                            fullWidth
                                            onChange={this.handleChange('name')}
                                            margin="normal"
                                            helperText={this.state.nameMessage}
                                        />
                                        <TextField
                                            id="multiline-flexible"
                                            error={this.state.errorAddress}
                                            label="Address"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.state.address}
                                            onChange={this.handleChange('address')}
                                            margin="normal"
                                            helperText={this.state.addressMessage}
                                        />

                                        <TextField
                                            id="website"
                                            error={this.state.errorWebsite}
                                            label="Website"
                                            className={classes.textField}
                                            value={this.state.website}
                                            fullWidth
                                            helperText={this.state.websiteMessage}
                                            onChange={this.handleChange('website')}
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div className={classes.Step1root}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={6} style={{margin: 'auto'}}>
                                        <TextField
                                            id="fname"
                                            error={this.state.errorfname}
                                            label="First Name"
                                            className={classes.textField}
                                            value={this.state.fname}
                                            fullWidth
                                            onChange={this.handleChange('fname')}
                                            margin="normal"
                                            helperText={this.state.fnameErrorMessage}
                                        />

                                        <TextField
                                            id="lname"
                                            error={this.state.errorlname}
                                            label="Last Name"
                                            className={classes.textField}
                                            value={this.state.lname}
                                            fullWidth
                                            onChange={this.handleChange('lname')}
                                            margin="normal"
                                            helperText={this.state.lnameErrorMessage}
                                        />
                                        <br/>
                                        <br/>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                            <Input
                                                id="adornment-password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                value={this.state.password}
                                                onChange={this.handleChange('password')}
                                                error={this.state.errorpassword}
                                                helperText={this.state.passwordErrorMessage}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                        >
                                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                        <TextField
                                            id="email"
                                            label="Email"
                                            error={this.state.erroremail}
                                            className={classes.textField}
                                            value={this.state.email}
                                            fullWidth
                                            onChange={this.handleChange('email')}
                                            margin="normal"
                                            helperText={this.state.emailErrorMessage}
                                        />

                                        <TextField
                                            id="contactno"
                                            label="Phone No"
                                            type="number"
                                            error={this.state.errorCondactNo}
                                            className={classes.textField}
                                            value={this.state.mobile}
                                            fullWidth
                                            onChange={this.handleChange('mobile')}
                                            margin="normal"
                                            helperText={this.state.condactNoErrorMessage}
                                        />
                                    </Grid>
                                </Grid>
                            </div>

                        )}

                        {activeStep === 2 && (
                            <div className={classes.Step1root}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={6} style={{margin: 'auto'}}>
                                        <FormControl className={classes.formControl} error={this.state.roleError}>
                                            <InputLabel htmlFor="role-simple">Roles</InputLabel>
                                            <Select
                                                value={this.state.userlevel}
                                                onChange={this.handleChange('userlevel')}
                                                inputProps={{
                                                    name: 'Roles',
                                                    id: 'role-simple',
                                                }}
                                            >
                                                {Roles.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {this.state.roleError ? <FormHelperText>Required</FormHelperText> : ""}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </div>
                    <div style={{
                        marginTop: '20px',
                        float: 'right'
                    }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.backButton}
                        >
                            Back
                        </Button>
                        <Button variant="raised" color="primary" onClick={this.handleNext}>
                            {activeStep === 2 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Register));
