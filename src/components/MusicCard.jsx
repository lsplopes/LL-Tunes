import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default function MusicCard({
    trackName,
    previewUrl,
    trackId,
    isCheck,
    favoritePage,
    artistName,
    collectionName,
    artworkUrl100,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isCheck);
  }, [])

  async function handleFavorite() {
    setIsLoading(true);
    if (checked) {
      await removeSong({
        trackName,
        previewUrl,
        trackId,
        artistName,
        collectionName,
        artworkUrl100,
      });
      setIsLoading(false);
      setChecked(false);
    } else {
      await addSong({
        trackName,
        previewUrl,
        trackId,
        artistName,
        collectionName,
        artworkUrl100,
      });
      setIsLoading(false);
      setChecked(true);
    }
  }

  return (
    <div className="music">
      { favoritePage && (
        <div className='album_card'>
          <img
            src={artworkUrl100}
            alt={collectionName}
          />
          <div>
            <p>{artistName}</p>
            <p>{collectionName}</p>
          </div>
        </div>
      )}
      <div>
        <p>{trackName}</p>
        <div className="inside_music">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>      
          { isLoading
            ? <Loading />
            : (
              <label htmlFor={ `checkbox-music-${trackId}` }>
                Favorite
                {' '}
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ handleFavorite }
                  checked={ checked }
                />
              </label>
            )}
        </div>
      </div>
    </div>
  );
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isCheck: PropTypes.bool.isRequired,
  favoritePage: PropTypes.bool.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};
