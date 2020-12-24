import React from 'react';
import './App.scss';
import NavMenu from './components/nav/nav-menu.jsx';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Home = React.lazy(() => import('./components/pages/home/home.jsx'));
const Spinner = React.lazy(() => import('./components/shared-components/spinner/spinner.jsx'));



const App = () => {
  return (
    <div className="App">
      <React.Suspense fallback={'asdf'}>
        <Router>
          <NavMenu />
          <React.Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/home/:filter">
                <Home />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/animations">
                <Spinner />
              </Route>
            </Switch>
          </React.Suspense>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
