import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ReactLoading from 'react-loading';
// import LaunchPage from './Screen/LaunchPage/index'
import LoginPage from './Screen/LoginPage/index'
import MainPage from './Screen/MainPage'
//DEFAULT ROUTER
ReactDOM.render((
    <div id="root-container">
    <div id='loading-screen'><ReactLoading type={'bubbles'} color={'white'} height={200} width={200} /></div>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={LoginPage}/>
            <Route exact path='/main' component={MainPage}/>
        </Switch>
    </BrowserRouter></div>
  ), document.getElementById('root'))