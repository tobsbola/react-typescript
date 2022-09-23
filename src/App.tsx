import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import { AppBar, Button, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './components/Home';
import UserNavPill from './components/login/UserNavPill';
import Login from './components/login/Login';
import Ledger from './components/ledger/Ledger';
import { Route, Routes } from 'react-router-dom';

interface AppState {
  user?: {
    email?: string
  }
}

export default class App extends Component<{}, AppState> {

  private readonly storageKey = 'userKey';

  constructor(props: {}) {
    super(props);

    const user = localStorage.getItem(this.storageKey)
     ? JSON.parse(localStorage.getItem(this.storageKey)!)
     : undefined;

     if (user) {
       this.state = user;
     }
  }

  handleLogin = (event: string): void => {
    const user = {
      user: {
        email: event
      }
    }

    this.state = user;

    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  render() {
    return (
      <div className="App">
        
        <AppBar position="static">
          <Toolbar>
            <IconButton>
              <MenuIcon></MenuIcon>
            </IconButton>
            <Typography variant='h4' component="div" sx={{ flexGrow: 1 }}>React Ledger</Typography>

            <UserNavPill email={this.state?.user?.email} />

          </Toolbar>
        </AppBar>

        <header className="App-header">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login onLogin={this.handleLogin} />} />
            <Route path='/ledger'
                element={this.state?.user?.email 
                  ? <Ledger email={this.state?.user?.email}/> 
                  : <Login onLogin={this.handleLogin} />}
              />
          </Routes>
        </header>

    </div>
    )
  }
}
