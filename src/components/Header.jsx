import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userAPI";
import Loading from "./Loading";
import "../css/header.css"

export default function Header() {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getUser();
      if (userInfo.name !== '') {
        setUser(userInfo.name)
      } else {
        setUser(userInfo.email)
      }
      setIsLoading(false);
    }
    getUserInfo()
  }, []);

  return (
    <header>
      <div className="upper_header">
        <h2 className="header_title">LL Tunes</h2>
        { isLoading ? <Loading /> : <p>{ `User: ${user}` }</p> }
      </div>
      <div className="botton_header">
        <a
          className="links"
          href="/search"
        >
          Search
        </a>
        <a
          className="links"
          href="/favorites"
        >
          Favorites
        </a>
        <a
          className="links"
          href="/profile"
        >
          Profile
        </a>
      </div>
    </header>
  )
}