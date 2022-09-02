import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Login from "../pages/Login";

describe('Login page tests', () => {
  beforeEach(() => window.localStorage.clear());

  it('Verifies if the inputs and buttons are present in the document', () => {
    render(<Login/>);

    const emailInput = screen.queryByRole('textbox', { name: /email:/i });
    const passwordInput = screen.queryByLabelText('Password:');
    const loginBtn = screen.queryByRole('button', { name: /login/i })

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  it('Verifies if the button stay after typing a wrong email format and password', () => {
    render(<Login/>);

    const emailInput = screen.queryByRole('textbox', { name: /email:/i });
    const passwordInput = screen.queryByLabelText('Password:');
    const loginBtn = screen.queryByRole('button', { name: /login/i });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'wrongEmailFormat');
    userEvent.type(passwordInput, '123');

    expect(loginBtn).toBeDisabled();
  });

  it('Verifies if the button is enabled after typing a correct email format and password', () => {
    render(<Login/>);

    const emailInput = screen.queryByRole('textbox', { name: /email:/i });
    const passwordInput = screen.queryByLabelText('Password:');
    const loginBtn = screen.queryByRole('button', { name: /login/i });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '123456');

    expect(loginBtn).not.toBeDisabled();
  });

  it('Verifies if the page is correctly redirected after accomplishing the login', async () => {
    const { history } = renderWithRouter(<Login />);

    const emailInput = screen.queryByRole('textbox', { name: /email:/i });
    const passwordInput = screen.queryByLabelText('Password:');
    const loginBtn = screen.queryByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginBtn);

    await waitFor(() => {      
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/search');
    }, { timeout: 3000});    
  });
})
