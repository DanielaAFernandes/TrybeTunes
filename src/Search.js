import React, { Component } from 'react';
import AlbumInfo from './AlbumInfo';
import Header from './Header';
import Loading from './Loading';
import searchAlbumsAPI from './services/searchAlbumsAPI';

let artist = '';

class Search extends Component {
  state = {
    artistSearchName: '',
    disabledButton: true,
    loading: false,
    listOfArtists: [],
  };

  validateSearchButton = () => {
    const { artistSearchName } = this.state;
    const minNumber = 2;
    return artistSearchName.length >= minNumber;
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

  cleanInput = () => {
    const { artistSearchName } = this.state;
    this.setState({
      [artistSearchName]: '',
    });
  };

  onSearchButtonClick = async () => {
    const { artistSearchName } = this.state;
    artist = artistSearchName;
    this.setState({ loading: true });
    this.cleanInput();
    const singerOrBandName = await searchAlbumsAPI(artistSearchName);
    this.setState({
      listOfArtists: singerOrBandName,
      loading: false,
    });

    this.setState({ artistSearchName: '' });
  };

  render() {
    const { artistSearchName, disabledButton, loading, listOfArtists } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form className="artist-form">
          Insira o nome do artista/banda:
          <input
            className="input-artist"
            type="text"
            data-testid="search-artist-input"
            name="artistSearchName"
            value={ artistSearchName }
            onChange={ this.enableSearchButton }
          />

          <button
            className="artist-button"
            type="button"
            data-testid="search-artist-button"
            disabled={ disabledButton }
            onClick={ this.onSearchButtonClick }
          >
            Pesquisar
          </button>
        </form>
        {
          loading
            && <Loading />
        }
        {
          (loading === false && listOfArtists.length === 0)
          && (
            <div>
              <p>Nenhum álbum foi encontrado</p>
            </div>
          )
        }
        {
          (loading === false && listOfArtists.length > 0)
          && (
            <div>
              <p>
                { `Resultado de álbuns de: ${artist}`}
              </p>
              { listOfArtists.map((album) => (
                <AlbumInfo key={ album.collectionId } album={ album } />
              ))}
            </div>
          )
        }
      </div>
    );
  }
}

export default Search;
