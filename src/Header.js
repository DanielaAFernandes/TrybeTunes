import React, { Component } from 'react';
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
      </div>
    );
  }
}

export default Header;
