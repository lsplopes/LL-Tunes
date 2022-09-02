import React, { useContext, useEffect, useState } from "react";
import CardsAlbuns from "../components/CardsAlbuns";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { tunesContext } from "../context/tunesProvider";
import searchAlbumsAPI from "../services/searchAlbumsAPI";
import "../css/search.css";

function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);

  const { currAlbuns, setCurrAlbuns } = useContext(tunesContext);

  useEffect(() => {
    const handleBtn = () => {
      if (searchInput.length >= 2) {
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    }
    handleBtn()
  }, [searchInput]);

  function handleChange({ target }) {
    setSearchInput(target.value);
  }

  async function handleSearch(event) {
    event.preventDefault()
    if (firstSearch) {
      setFirstSearch(false);
    }
    setIsLoading(true);
    const albunsFromAPI = await searchAlbumsAPI(searchInput);
    setSearchInput('');
    setCurrAlbuns(albunsFromAPI);
    setIsLoading(false);
  }

  function renderHandler() {
    if (firstSearch) {
      return <p>Your results will appear here.</p>
    }
    if (currAlbuns.length >= 1) {
      return <CardsAlbuns />
    }
    if (isLoading) {
      return <Loading />
    }
    return <p>Did not found</p>
  }

  return (
    <>
      <Header />
      <div className="search_container">
        <h1 className="search_title">Search Page</h1>
        <div>
          <form>
            <label htmlFor="search-artist-input">
              Music Search:
              <br />
              <input
                className="search_input"
                type="text"
                data-testid="search-artist-input"
                id="search-artist-input"
                onChange={ handleChange }
                value={ searchInput }
              />
            </label>
            {' '}
            <button
              className="search_btn"
              type="button"
              data-testid="search-artist-button"
              disabled={ disableBtn }
              onClick={ handleSearch }
            >
              Search
            </button>
          </form>
        </div>
        <div className="results_container">
          { renderHandler() }
        </div>
      </div>
    </>
  )
}

export default Search;
