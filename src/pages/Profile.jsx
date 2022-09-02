import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import "../css/profile.css";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    image: 'https://www.tenforums.com/tutorials/90186-change-default-account-picture-windows-10-a.html'
  });

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUser();
      setUser(data);
      setIsLoading(false);
    };
    getUserData();
  }, [])

  function userConstructor() {
    const {
      description,
      email,
      image,
      name,
    } = user;
    return (
      <div className="profile_container">
        <img
          className="profile_img"
          src={ image }
          alt={ name }
          data-testid="profile-image"
        />
        <div className="profile_info">
          <h3>{ `Name: ${name}` }</h3>
          <h3>{ `Email: ${email}` }</h3>
          <p>{ `Description: ${description}` }</p>
        </div>
        <Link
          className="profile_btn"
          to="/profile/edit"
        >
          Editar perfil
        </Link>
      </div>
    );
  }

  
    return (
      <>
        <Header />
        <div className="body_container" data-testid="page-profile">
          <h1>Profile</h1>
          { isLoading ? <Loading /> : (userConstructor()) }
        </div>
      </>
    );
}
