import React from 'react';
import './App.css';
import NavMenu from './components/nav/nav-menu.jsx';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Home = React.lazy(() => import('./components/pages/home/home.jsx'));


function App() {
  console.clear();
  return (
    <div className="App">
      <Router>
        <NavMenu />
        <React.Suspense fallback={"Loading..."}>
          <Switch>
            <Route path="/home/:filter">
              <Home />
            </Route>
          </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
