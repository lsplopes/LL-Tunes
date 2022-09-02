import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';

export const tunesContext = createContext();

function TunesProvider({ children }) {
  const [currAlbum, setCurrAlbum] = useState({});
  const [currAlbuns, setCurrAlbuns] = useState([]);
  const value = React.useMemo(() => ({
    currAlbum,
    setCurrAlbum,
    currAlbuns,
    setCurrAlbuns,
  }), [currAlbum, currAlbuns])
  
  return (
    <tunesContext.Provider value={ value }>
      {children}
    </tunesContext.Provider>
  );
}

TunesProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default TunesProvider;
