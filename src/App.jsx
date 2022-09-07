import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TunesProvider from './context/tunesProvider';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

function App() {
  return (
    <Switch>
        <TunesProvider>
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
    </TunesProvider>
      </Switch>
  );
}

export default App;
