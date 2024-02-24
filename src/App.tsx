import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, useLocation, Switch, useHistory } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './services/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import RegisterPage from "./pages/RegisterPage";
import YourInputsPage from './pages/YourInputsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ForumPage from './pages/ForumPage';
import TipsAndSuggestionsPage from './pages/TipsAndSuggestionsPage';
import PostsPage from './pages/PostsPage';

//import { useAppDispatch, useAppSelector } from './services/ConfigureStore';


function App() {
  const location = useLocation<any>();



  return (
   <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        {location.pathname.indexOf("success") === -1 ? <Header /> : <></>}
        <div style={{ flex: 1 }}>
          <PrivateRoute exact path='/' component={HomePage}/>
          <Route path={'/(.+)'} render={({ location }) => (
            <Switch>
              <Route path='/login' component={LoginPage} />
              <PrivateRoute exact path='/yourInputs' component={YourInputsPage}/>
              <PrivateRoute exact path='/posts' component={PostsPage}/>
              <PrivateRoute exact path='/leaderboard' component={LeaderboardPage}/>
              <PrivateRoute exact path='/forum' component={ForumPage}/>
              <PrivateRoute exact path='/tipsandsuggestions' component={TipsAndSuggestionsPage}/>
              <PrivateRoute path='/test' component={LoginPage} />
              <Route path='/register' component={RegisterPage} />
              <Route component={NotFound} />
              <Route path='/login' component={LoginPage} />
            </Switch>
            )} />
        </div>
   </div>
  );
}

export default App;
