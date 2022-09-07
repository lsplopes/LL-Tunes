import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import TunesProvider from '../context/tunesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import { act } from 'react-dom/test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Favorites from '../pages/Favorites';
import { favoriteMock } from './mocks/favoriteMock';


describe('Favorite page tests', () => {
  it('Verifies if favorite page renders all musics from different albums', async () => {
    const { history } = renderWithRouter(
      <TunesProvider>
        <App />
      </TunesProvider>
    );

    act(() => {
      history.push('/album/1440880887'); // Offspring
    });

    expect(history.location.pathname).toBe("/album/1440880887"); 

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /musics from album/i })).toBeInTheDocument();
    });

    expect(screen.getAllByTestId('loading')).toHaveLength(2);

    await waitForElementToBeRemoved(screen.queryAllByTestId('loading'), { timeout: 2000}).then(() => console.log("removed"));

    expect(screen.getByTestId('checkbox-music-1440881505')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('checkbox-music-1440881417'));
    userEvent.click(screen.getByTestId('checkbox-music-1440881505'));

    act(() => {
      history.push('/favorites');
    });

    expect(history.location.pathname).toBe("/favorites"); 

    await waitForElementToBeRemoved(screen.queryAllByTestId('loading'), { timeout: 2000}).then(() => console.log("removed"));

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Have You Ever')).toBeInTheDocument();
  });

  it('Verifies if there more than one music in favorites', async () => {
    localStorage.setItem('favorite_songs', JSON.stringify(favoriteMock))
    render(
      <TunesProvider>
        <Favorites />
      </TunesProvider>
    )

    await waitForElementToBeRemoved(screen.queryAllByTestId('loading'), { timeout: 2000}).then(() => console.log("removed"));

    expect(screen.getByText('Bridge Burning')).toBeInTheDocument();
    expect(screen.getByText('Rope')).toBeInTheDocument();
    expect(screen.getByText('Even Flow')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Have You Ever')).toBeInTheDocument();
    
    userEvent.click(screen.getByTestId('checkbox-music-425465318'));
  })
});
