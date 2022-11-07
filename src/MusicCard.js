import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from './services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  addFavorite = async ({ target }) => {
    this.setState({
      loading: true,
      checked: true,
    });
    const { checked } = target;
    const { songs } = this.props;
    if (checked) {
      await addSong(songs);
    }
    this.setState({
      loading: false,
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
        <div>
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
