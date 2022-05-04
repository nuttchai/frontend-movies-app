import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Movies from "./components/Movies";
import Genres from "./components/Genres";
import Genre from "./components/Genre";
import EditMovie from "./components/EditMovie";

export default function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">Go Watch a Movie!</h1>
          <hr className="mb-3"></hr>
        </div>
        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/genres">Genres</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin/movie/0">Add movie</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin">Manage Catalogue</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-10">
            {/* Similar with Switch Statement and its ORDER is matter if we don't include "exact" in Route component! */}
            <Switch>
              <Route path="/movies/:id" component={Movie} />
              <Route path="/movies">
                <Movies />
              </Route>
              <Route path="/genre/:id" component={Genre} />
              <Route path="/genres">
                <Genres />
              </Route>
              <Route path="/admin/movie/:id" component={EditMovie} />
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
