import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <ProfileEdit />
      </div>
    );
  }
}

export default Profile;
