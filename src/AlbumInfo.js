import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumInfo extends Component {
  render() {
    const { album } = this.props;
    const { artistName, collectionId, collectionName,
      artworkUrl100 } = album;
    return (
      <div className="artist-album">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <div>
            <img className="artist-album" src={ artworkUrl100 } alt={ collectionName } />
            <p data-testid="artist-name">
              { artistName }
            </p>
            <p data-testid="album-name">
              { collectionName }
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

AlbumInfo.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};

export default AlbumInfo;
