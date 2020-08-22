import React from "react";
import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';
import CreateGun from "./Gun/CreateGun";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import SearchGuns from "./Gun/SearchGuns";
import GunList from "./Gun/GunList";
import GunDetail from "./Gun/GunDetail"
import Header from "./Header"
import TopGuns from "./Gun/TopGuns"
import useAuth from "./Auth/useAuth"
import firebase, { FirebaseContext } from "../firebase"
import Profile from "./Auth/Profile";
import Footer from "./footer"
import Airsoftinfo from "./AirsoftInfo";
import About from "./About";
import ErrorPage from "./Error"

function App() {

  const user = useAuth();


  return (
    <BrowserRouter >
      <FirebaseContext.Provider value={{ user, firebase }}>
        <div className="app-container">
          <Header />
          <div className="route-container">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/new/1" />} />

              <Route path="/create">
                {!user ? (<Redirect to="/login" />) : (<CreateGun />)}
              </Route>

              <Route path="/login" component={Login} />
              <Route path="/forgot" component={ForgotPassword} />

              <Route path="/profile">
                {!user ? (<Redirect to="/login" />) : (<Profile />)}
              </Route>

              <Route path="/search" component={SearchGuns} />
              <Route path="/top" component={TopGuns} />
              <Route path="/Airsoftinfo" component={Airsoftinfo} />
              <Route path="/About" component={About} />
              <Route path="/new/:page" component={GunList} />
              <Route path="/gun/:gunId" component={GunDetail} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
          <br />
          <Footer />
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
