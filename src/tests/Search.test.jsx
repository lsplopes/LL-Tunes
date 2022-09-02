import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Search from '../pages/Search'
import TunesProvider from '../context/tunesProvider';

describe('Search page tests', () => {
  beforeEach(() => window.localStorage.clear());

  it('Verifies if there is a search input and a button in the page', () => {
    render(<TunesProvider><Search /></TunesProvider>);

    expect(screen.getByRole('textbox', { name: /music search:/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  });

  it('Verifies if before a search, the page show the right message', () => {
    render(<TunesProvider><Search /></TunesProvider>);

    expect(screen.getByText('Your results will appear here.')).toBeInTheDocument();
  });

  it('Verifies if after searching a wrong word, the page show the right message', async () => {
    render(<TunesProvider><Search /></TunesProvider>);

    const searchInput = screen.getByRole('textbox', { name: /music search:/i });
    const searchBtn = screen.getByRole('button', { name: /search/i });

    userEvent.type(searchInput, 'flksjdf');
    userEvent.click(searchBtn);

    await waitFor(() => {
        expect(screen.getByText('Did not found')).toBeInTheDocument();
    }, {timeout: 3000})
  });

  it('Verifies if after searching for a band, the page show its albums', async () => {
    render(<TunesProvider><Search /></TunesProvider>);

    const searchInput = screen.getByRole('textbox', { name: /music search:/i });
    const searchBtn = screen.getByRole('button', { name: /search/i });

    userEvent.type(searchInput, 'offspring');
    userEvent.click(searchBtn);

    await waitFor(() => {
        expect(screen.getByText(/americana/i)).toBeInTheDocument();
    }, { timeout: 3000});
  });

  it('Verifies if after a second search, the page shows the correct albums', async () => {
    render(<TunesProvider><Search /></TunesProvider>);

    const searchInput = screen.getByRole('textbox', { name: /music search:/i });
    const searchBtn = screen.getByRole('button', { name: /search/i });

    userEvent.type(searchInput, 'offspring');
    userEvent.click(searchBtn);

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText(/americana/i)).toBeInTheDocument();
      }, 3000);
    });

    await waitFor(() => {
        expect(searchInput).toHaveValue('');
    }, { timeout: 2000 });

    userEvent.type(searchInput, 'foo fighters');
    userEvent.click(searchBtn);

    await waitFor(() => {
        expect(screen.getByText(/concrete and gold/i)).toBeInTheDocument();
    });
  });
})
