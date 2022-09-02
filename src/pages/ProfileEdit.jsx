import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import "../css/profile.css"

export default function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUser();
      setUser(data);
      setIsLoading(false);
    };
    getUserData();
  }, [])

  async function handleSave(event) {
    event.preventDefault();
    setIsLoading(true);
    await updateUser(user);
    setIsLoading(false);
    setSaved(true);
  }

  function handleBtn() {
    const {
        name,
        email,
        description,
        image,
    } = user;
    const check = (
      !(!name)
      && !(!description)
      && !(!image)
      && EmailValidator.validate(email)
    );
    return !check;
  }

  function handleChange(event) {
    const { target } = event;
    const obj = { [target.name]: target.value };
    setUser({
      ...user,
      ...obj,
    })
  }

  function userConstructor() {
    const {
      description,
      email,
      image,
      name,
    } = user;
    return (
      <div className="profile_edit_container">
        <img
          className="profile_img"
          src={ image }
          alt={ name }
          data-testid="profile-image"
        />
        <form className="profile_form">
          <label htmlFor="edit-input-name">
            Name:
            <br />
            <input
              type="text"
              name="name"
              data-testid="edit-input-name"
              id="edit-input-name"
              onChange={ handleChange }
              value={ name }
            />
          </label>
          <label htmlFor="edit-input-email">
            E-mail:
            <br />
            <input
              type="text"
              name="email"
              data-testid="edit-input-email"
              id="edit-input-email"
              onChange={ handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="edit-input-description">
            Description:
            <br />
            <input
              type="text"
              name="description"
              data-testid="edit-input-description"
              id="edit-input-description"
              onChange={ handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="edit-input-image">
            Image url:
            <br />
            <input
              type="text"
              name="image"
              data-testid="edit-input-image"
              id="edit-input-image"
              onChange={ handleChange }
              value={ image }
            />
          </label>
          <button
            className="profile_btn"
            type="submit"
            data-testid="edit-button-save"
            disabled={ handleBtn() }
            onClick={ handleSave }
          >
            Save
          </button>
        </form>
        { saved && <Redirect to="/profile" /> }
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="body_container" data-testid="page-profile-edit">
        <h1>
          Profile Edit
        </h1>
        { isLoading ? <Loading /> : (userConstructor()) }
      </div>
    </>
  );
}

