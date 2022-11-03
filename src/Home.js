import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import NotFound from './NotFound';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Minha homepage</h1>
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="/" component={ NotFound } />
      </div>
    );
  }
}

export default Home;
