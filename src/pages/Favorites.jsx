import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import MusicCard from "../components/MusicCard";
import { getFavoriteSongs } from "../services/favoriteSongsAPI";
import "../css/favorites.css";

function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMusics = async () => {
      const favoritesData = await getFavoriteSongs();
      favoritesData.sort((a, b) => {
        const fa = a.artistName.toLowerCase();
        const fb = b.artistName.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })
      setFavorites(favoritesData)
      setIsLoading(false);
    }
    fetchMusics();
  }, [favorites]);

  return (
    <div>
      <Header />
      <div className="body_container">
        <h1>Favorites page</h1>
        <div className="favorites_container">
          { isLoading
            ? <Loading />
            : (
              favorites.map((track) => <MusicCard
              key={ track.trackId }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
              isCheck
              favoritePage
              artistName={ track.artistName }
              collectionName={ track.collectionName }
              artworkUrl100={ track.artworkUrl100 }
              />)
            )}
        </div>
      </div>
    </div>
  )
}

export default Favorites;
