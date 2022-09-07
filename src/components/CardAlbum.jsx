import React, { useContext } from "react";
import { tunesContext } from "../context/tunesProvider";

export default function CardAlbum() {
  const { currAlbum } = useContext(tunesContext);

  return (
    <div>
      <img
        src={currAlbum.artworkUrl100}
        alt={currAlbum.collectionName}
      />
      <h4>{currAlbum.collectionName}</h4>
      <p>{currAlbum.artistName}</p>
    </div>
  )
}
