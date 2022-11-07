import React, { Component } from 'react';
import Header from './Header';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from './services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    loading: false,
    songsList: [],
  };

  componentDidMount() {
    this.showFavoriteSongs();
  }

  showFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const showSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      songsList: showSongs,
    });
  };

  render() {
    const { loading, songsList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          { loading ? <Loading /> : (
            <div>
              {songsList.map((favoriteSongs) => (
                <MusicCard
                  key={ favoriteSongs.trackId }
                  trackName={ favoriteSongs.trackName }
                  trackId={ favoriteSongs.trackId }
                  previewUrl={ favoriteSongs.previewUrl }
                  songs={ favoriteSongs }
                />
              ))}
            </div>

          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
