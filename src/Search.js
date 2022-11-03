import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import Header from './Header';

class Search extends Component {
  state = {
    artistName: '',
    disabledButton: true,
  };

  validateSearchButton = () => {
    const { artistName } = this.state;
    const minNumber = 2;
    return artistName.length >= minNumber;
  };

  enableSearchButton = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        disabledButton: !this.validateSearchButton(),
      });
    });
  };

  render() {
    const { artistName, disabledButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="login-name-input">
            Insira o nome do artista/banda
            <input
              type="text"
              data-testid="search-artist-input"
              name="artistName"
              value={ artistName }
              onChange={ this.enableSearchButton }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabledButton }
            // onClick={ this.isLoadingTrue }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
