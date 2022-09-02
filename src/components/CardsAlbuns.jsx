import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { tunesContext } from "../context/tunesProvider";
import "../css/search.css";

export default function CardsAlbuns() {
  const { currAlbuns } = useContext(tunesContext);

  return (
    // <div>
       currAlbuns.map((album) => (
        <a
          href={`/album/${album.collectionId}`}
          key={album.collectionId}
          className="links"
          data-testid={`${album.collectionId}`}
          >
          <div className="search_cards">
            <img
              className="album_img"
              src={album.artworkUrl100}
              alt={album.collectionName}
            />
            <h3>{album.artistName}</h3>
            <h4
              href={`/album/${album.collectionId}`}
              data-testid={album.collectionName}
            >
              {album.collectionName}
            </h4>
          </div>
        </a>
      ))
    // </div>
  )
};
