import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Row, Col } from "antd";
import Home from "./Home";
import Login from "./Login";
import NavBar from "./layout/NavBar";
import Diagnosis from "./diagnosis/Diagnosis";
import Report from "./view results/Report";
import ViewResults from "./view results/ViewResults";
import AboutUs from "./AboutUs";
import Admin from "./admin/Admin";
import PageNotFound from "./PageNotFound";
import { updateToken } from "./api";

import "./layout/LayOut.css";
import Contexts from "./utils/Contexts";

function Routes() {
  const [currentActivity, setCurrentActivity] = useState({});

  const value = {
    active: {
      currentActivity: currentActivity,
      setCurrentActivity: setCurrentActivity,
    },
  };

  if (localStorage.getItem("auth") === "true") {
    sessionStorage.setItem("token", localStorage.getItem("token"));
    sessionStorage.setItem("user", localStorage.getItem("user"));
    sessionStorage.setItem("auth", true);
    updateToken();
  }

  const auth = sessionStorage.getItem("auth") === "true" ? true : false;

  // if already login, redirect to home. if not, show login page
  return (
    <BrowserRouter>
      <Contexts.Provider value={value}>
        <Row style={{ height: "100%" }}>
          {auth && <Col span={3} style={{ borderRight: "1px solid #c4c4c4", background: "#fafafa" }}>
            <NavBar />
          </Col>}
          <Col span={auth ? 21 : 24}>
            <Switch>
                <Route
                  path="/"
                  exact
                  render={() => (auth ? <Home /> : <Redirect to="/login" />)}
                />
                <Route
                  path="/diagnosis"
                  exact
                  render={() => (auth ? <Diagnosis /> : <Redirect to="/login" />)}
                />
                <Route
                  path="/diagnosis/:mode/:rid"
                  exact
                  render={() => (auth ? <Diagnosis /> : <Redirect to="/login" />)}
                />
                <Route
                  path="/viewresults"
                  exact
                  render={() => (auth ? <ViewResults /> : <Redirect to="/login" />)}
                />
                <Route
                  path="/viewresults/:mode/:rid"
                  exact
                  render={() => (auth ? <Report /> : <Redirect to="/login" />)}
                />
                <Route
                  path="/aboutus"
                  exact
                  render={() => (auth ? <AboutUs /> : <Redirect to="/login" />)}
                />
                <Route
                  path="/admin"
                  exact
                  render={() => (auth ? <Admin /> : <Redirect to="/login" />)}
                />
                <Route
                  path="/admin/:mode"
                  exact
                  render={() => (auth ? <Admin /> : <Redirect to="/login" />)}
                />
                <Route
                  path="/login"
                  render={() => (auth ? <Redirect to="/" /> : <Login />)}
                />
                <Route
                  render={() => (auth ? <PageNotFound /> : <Redirect to="/" />)}
                />
              </Switch>
            </Col>
          </Row>
      </Contexts.Provider>
    </BrowserRouter>
  );
}

export default Routes;
