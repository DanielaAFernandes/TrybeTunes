import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
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
        <Login />
        <Search />
        <Album />
        <Favorites />
        <Profile />
        <NotFound />
      </div>
    );
  }
}

export default Home;
