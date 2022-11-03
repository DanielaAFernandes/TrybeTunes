import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    loading: false,
  };

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = async () => {
    this.setState({ loading: true });
    const userName = await getUser();
    this.setState({ userName: userName.name, loading: false,
    });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <div>
        <header data-testid="header-component" />
        { loading
          ? <Loading />
          : <p data-testid="header-user-name">{ userName }</p>}
        ;
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </div>
    );
  }
}

export default Header;
