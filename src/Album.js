import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import getMusics from './services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    musicInfo: [],
    artistName: '',
    albumName: '',
    albumCover: '',
    loading: false,
  };

  componentDidMount() {
    this.fetchGetMusics();
  }

  fetchGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const song = await getMusics(id);
    this.setState({ musicInfo: song,
      albumCover: song[0].artworkUrl100,
      albumName: song[0].collectionName,
      artistName: song[0].artistName,
      loading: false,
    });
  };

  // addFavorite = async (song) => {
  //   const { musicInfo } = this.state;
  //   const selectedSong = musicInfo.find(({ trackId }) => trackId === song.trackId);
  //   this.setState({ loading: true });
  //   if (musicInfo[selectedSong].checked) {
  //     musicInfo[selectedSong].checked = true;
  //     await addSong(song);
  //   }
  //   this.setState({ loading: false, musicInfo });
  // };

  render() {
    const { musicInfo, loading, albumCover, albumName, artistName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading && <Loading />}
        <div className="artist-album">
          <img className="image-cd" src={ albumCover } alt={ albumName } />
          <p className="name-artist" data-testid="artist-name">
            {artistName}
          </p>
          <p className="name-album" data-testid="album-name">
            {albumName}
          </p>
          {
            musicInfo.slice(1).map((music) => (
              <MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default Album;
