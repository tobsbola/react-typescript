import { Avatar, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

interface PillProps {
    email?: string | null;
}

export default class UserNavPill extends Component<PillProps> {

    constructor(props: PillProps) {
        super(props);
    }

    render() {
        const { email } = this.props;

        return (
            (email && email.length >= 1)
             ? <Avatar sx={{ bgcolor: deepOrange[500] }} data-testid='user-avatar'>{ email.substring(0,1).toUpperCase() }</Avatar>
             : <Button
                    data-testid="login-button"
                    color='inherit'
                    component={Link}
                    to='/login'
                    >
                        Login
                    </Button>
        )
    }
}
