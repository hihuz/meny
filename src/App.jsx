import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchRecipes,
  fetchUsers,
  setCurSeason,
  hideTransition,
  hideNotification,
} from "./actions";
import AsyncRoute from "./views/AsyncRoute";
import Landing from "./views/Landing";
import Browse from "./views/Browse";
import ScrollToTop from "./components/ScrollToTop";
import Transition from "./views/Transition";
import Notification from "./components/Notification";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./styles/normalize.css";
import "./styles/milligram.css";
import "./styles/main.scss";
import "./styles/notification.css";
import "./styles/icomoon.css";
import "./styles/modal.css";
import { withRouterCompat } from "./hoc/withRouterCompat";

const Add = lazy(() => import("./views/Add"));
const RecipePage = lazy(() => import("./views/RecipePage"));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.hideTransition = this.hideTransition.bind(this);
    this.hideNotification = this.hideNotification.bind(this);
  }

  componentDidMount() {
    this.props.dispatchSetCurSeason();
    if (!this.props.hasRecipesData) {
      this.props.dispatchFetchRecipes();
    }
    if (this.props.users.length === 0) {
      this.props.dispatchFetchUsers();
    }
  }

  hideTransition() {
    this.props.dispatchHideTransition();
  }

  hideNotification() {
    this.props.dispatchHideNotification(this.props.notification.id);
  }

  render() {
    return (
      <div>
        <ScrollToTop />

        {this.props.transition.shown && (
          <Transition {...this.props.transition.config} hideTransition={this.hideTransition} />
        )}

        <NavBar users={this.props.users} />
        <Suspense
          fallback={
            <div className="container" style={{ paddingTop: "8rem", marginTop: "8rem" }}>
              <div className="loader-container">
                <div className="loader">Chargement...</div>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/add" element={<Add />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
          </Routes>
        </Suspense>
        <Footer />

        {this.props.notification.shown && (
          <Notification
            msg={this.props.notification.msg}
            type={this.props.notification.type}
            hideNotification={this.hideNotification}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  transition: state.transition,
  notification: state.notification,
  hasRecipesData: state.hasRecipesData,
});

export default withRouterCompat(
  connect(mapStateToProps, {
    dispatchFetchRecipes: fetchRecipes,
    dispatchSetCurSeason: setCurSeason,
    dispatchFetchUsers: fetchUsers,
    dispatchHideTransition: hideTransition,
    dispatchHideNotification: hideNotification,
  })(App)
);
