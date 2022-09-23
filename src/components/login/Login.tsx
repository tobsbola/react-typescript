import { Alert, AlertTitle, Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, Component } from 'react'
import { Link } from 'react-router-dom';

type AuthStatusType = 'none' | 'success' | 'error';

interface LoginState {
    validPassword: string,
    email: string,
    password: string,
    authStatus: AuthStatusType
}

interface ResetPassword {
    newPassword: string;
    confirm: string;
}

interface BothLoginFormsState {
    login: LoginState;
    reset: ResetPassword;
}

interface LoginProps {
    onLogin: (email: string) => void;
}

export default class Login extends Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            validPassword: 'guest',
            authStatus: 'none',
            email: '',
            password: ''
        }
    }

    handleUserInput = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as any )
    }

    handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        let isSuccess = false;
        if (this.state.password === this.state.validPassword) {
            isSuccess = true;
            this.props.onLogin(this.state.email)
        }
        this.setState({
            authStatus: isSuccess ? 'success' : 'error'
        })
    }

    render() {
        let alertMessage;
        let ledgerButton;
        const { authStatus } = this.state;

        const messages = {
            success: 'You have been authenticated',
            error: 'Sorry we were not able to authenticate you',
            none: ''
        }

        const message = messages[authStatus];

        if (authStatus !== 'none') {
            alertMessage = <Alert
                            data-testid='alert'
                            severity={authStatus}
                            >
                                <AlertTitle>
                                    { message }
                                </AlertTitle>
                            </Alert>
        }

        if (authStatus === 'success') {
            ledgerButton = <Button
                variant='contained'
                component={Link}
                to='/ledger'
            >
                Go to Ledger
            </Button>
        }


        return (
            <Box
                component="form"
                autoComplete='off'
                onSubmit={this.handleFormSubmit}
                sx={{
                    minWidth: '500px',
                    backgroundColor: 'white',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap'
                }}
            >
                { alertMessage }

                <TextField 
                    id='email'
                    name='email'
                    label='Email'
                    required
                    type='email'
                    inputProps={{ 'data-testid': 'email' }}
                    onChange={this.handleUserInput}
                    sx={{ mb: 3 }}
                />

                <TextField 
                        id='password'
                        name='password'
                        label='Password'
                        required
                        type='password'
                        inputProps={{ 'data-testid': 'password' }}
                        onChange={this.handleUserInput}
                        sx={{ mb: 3 }}
                    />

                <Button
                    variant='contained'
                    type='submit'
                    data-testid='submit-btn'
                >
                    Login
                </Button>

                { ledgerButton }
            </Box>
        )
    }
}
