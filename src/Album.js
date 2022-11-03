import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import Header from './Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

export default Album;
