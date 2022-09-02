import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import MusicCard from "../components/MusicCard";
import getMusics from "../services/musicsAPI";
import { getFavoriteSongs } from "../services/favoriteSongsAPI"
import Loading from "../components/Loading";
import "../css/album.css";

function Album() {
  const [isLoading, setIsLoading] = useState(true);
  const [currAlbum, setCurrAlbum] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const history = useHistory()
  const { pathname } = history.location;
  const collectionId = pathname.split('/')[2];

  useEffect(() => {
    const fetchMusics = async () => {
      const albumData = await getMusics(collectionId);
      setCurrAlbum(albumData);
      const favoritesData = await getFavoriteSongs();
      setFavorites(favoritesData);
      setIsLoading(false);
    }
    fetchMusics();
  }, []);

  function musicOrderer() {
    const albumY = currAlbum
      .map((song) => (favorites.find((favSong) => song.trackId === favSong.trackId)
        ? { ...song, isCheck: true }
        : { ...song, isCheck: false }));
    return (
      <div className="album_musics">
        <div className="album_container">
          <img
            className="album_img"
            src={currAlbum[0].artworkUrl100}
            alt={currAlbum[0].collectionName}
          />
          <h3>{currAlbum[0].artistName}</h3>
          <h4>{currAlbum[0].collectionName}</h4>
        </div>
        <div className="musics_container">
          { albumY
            .filter((obj) => obj.kind === 'song')
            .map((track) => <MusicCard
              key={ track.trackId }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
              isCheck={ track.isCheck }
              favoritePage={ false }
              artistName={ currAlbum[0].artistName }
              collectionName={ currAlbum[0].collectionName }
              artworkUrl100={ currAlbum[0].artworkUrl100 }
            />)
          }
        </div>
      </div>
    );
  }

  return (    
    <div>
      <Header />
      <div className="body_container">
        <h1>Musics from album</h1>
        { isLoading ? <Loading /> : (musicOrderer()) }
      </div>
    </div>
  )
}

export default Album;
