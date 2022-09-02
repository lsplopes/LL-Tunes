// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react'
// import userEvent from '@testing-library/user-event';
// import App from '../App'
// import TunesProvider from '../context/tunesProvider';
// import renderWithRouter from '../helpers/renderWithRouter';
// import { act } from 'react-dom/test-utils';

// describe('Album page tests', () => {
//   it('Verifies if there is the right components in the page', async () => {
//     const { history } = renderWithRouter(<TunesProvider><App /></TunesProvider>);
    
//     act(() => {
//       history.push('/album/1440880887');
//     });

//     await waitFor(() => {
//       expect(screen.getByRole('heading', { name: /musics from album/i })).toBeInTheDocument();
//     });

//     await waitFor(() => {
//       expect(screen.getByRole('heading', { name: /americana/i })).toBeInTheDocument();
//     }, { timeout: 4000 });
//   });
// })