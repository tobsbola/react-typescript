import { Button } from '@mui/material'
import React, { Component } from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
        <div className='home'>
          
            <img src={logo} className="App-logo" alt="logo" />
            
            {/* <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                React Ledger
            </a> */}

            <br />
            <Button 
                variant="contained"
                data-testid="goto-ledger"
                component={Link}
                to='/ledger'
            >Go To Ledger</Button>
                  
        </div>
    )
  }
}
