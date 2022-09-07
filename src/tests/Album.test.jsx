import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import TunesProvider from '../context/tunesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import { act } from 'react-dom/test-utils';
import App from '../App';


describe('Album page tests', () => {
  it('Verifies if there is the right components in the page', async () => {
    const { history } = renderWithRouter(
      <TunesProvider>
        <App />
      </TunesProvider>
    );

    act(() => {
      history.push('/album/1440880887');
    });

    expect(history.location.pathname).toBe("/album/1440880887"); 

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /musics from album/i })).toBeInTheDocument();
    });

    expect(screen.getAllByTestId('loading')).toHaveLength(2);

    await waitForElementToBeRemoved(screen.queryAllByTestId('loading'), { timeout: 2000}).then(() => console.log("removed"));

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Have You Ever')).toBeInTheDocument();
  });
})