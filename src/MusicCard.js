import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from './services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  componentDidMount() {
    this.storageFavoriteSongs();
  }

  storageFavoriteSongs = async () => {
    const { trackName } = this.props;
    this.setState({
      loading: true,
    });
    const getSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      checked: getSongs.find((favoriteSong) => favoriteSong.trackName === trackName),
    });
  };

  addFavorite = async (event) => {
    const { checked } = event.target;
    const { songs } = this.props;
    this.setState({
      loading: true,
      checked,
    });
    if (checked) {
      console.log(songs);
      await addSong(songs);
    } else {
      await removeSong(songs);
    }
    this.setState({
      loading: false,
      checked: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div className="audio-preview">
        <p>{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div className="favorite">
          <label htmlFor={ trackId }>
            Favorita
            <input
              type="checkbox"
              name="favoriteSongs"
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.addFavorite }
              checked={ checked }
            />
          </label>
          { loading && <Loading />}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  songs: PropTypes.object,
}.isRequired;

export default MusicCard;
