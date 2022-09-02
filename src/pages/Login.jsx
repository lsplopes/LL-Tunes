import React, { useEffect, useState } from "react";
import * as EmailValidator from 'email-validator';
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import { createUser } from "../services/userAPI";
import "../css/login.css";

function Login() {

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const toggleBtn = () => {
      const SIX = 6;
      const doEmailValidation = EmailValidator.validate(inputEmail);
      const dataValidation = doEmailValidation
        && inputPassword.length >= SIX
      setDisabledBtn(!dataValidation);
    }
    toggleBtn();
  }, [inputEmail, inputPassword]);

  function handleChange({target}) {
    if (target.name === 'email-input') {
      setInputEmail(target.value)
    } else {
      setInputPassword(target.value)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await createUser({ email: inputEmail, passWord: inputPassword });
    history.push('/search');

  }

  return (
    <div className="login_page">
        <h1 className="login_title">LL Tunes</h1>
      <form
      className="login_form"
      onSubmit={ handleSubmit }
      >
        <label htmlFor="email-input">
          Email:
          <br />
          <input
            type="email"
            id="email-input"
            name="email-input"
            value={ inputEmail }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Password:
          <br />
          <input
            type="password"
            id="password-input"
            name="password-input"
            data-testid="password-input"
            value={ inputPassword }
            onChange={ handleChange }
          />
        </label>
        <button
          type="submit"
          disabled={ disabledBtn }
          className="login_btn"
        >
          Login
        </button>
        {isLoading && <Loading />}
      </form>
    </div>
  )
}

export default Login;
