import React from "react";
import Route from "react-router-dom/Route";
import withRouter from "react-router-dom/withRouter";
import { connect } from "react-redux";
import {
  fetchRecipes,
  fetchUsers,
  setCurSeason,
  hideTransition,
  hideNotification
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
        <Route component={ScrollToTop} />
        {this.props.transition.shown ? (
          <Transition {...this.props.transition.config} hideTransition={this.hideTransition} />
        ) : null}
        <NavBar users={this.props.users} />
        <Route exact path="/" component={Landing} />
        <Route path="/browse" component={Browse} />
        <Route
          path="/favorites"
          render={() => <AsyncRoute loadingPromise={import("./views/Favorites")} />}
        />
        <Route path="/add" render={() => <AsyncRoute loadingPromise={import("./views/Add")} />} />
        <Route
          path="/recipes/:id"
          render={props => (
            <AsyncRoute props={props} loadingPromise={import("./views/RecipePage")} />
          )}
        />
        <Footer />
        {this.props.notification.shown ? (
          <Notification
            msg={this.props.notification.msg}
            type={this.props.notification.type}
            hideNotification={this.hideNotification}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  transition: state.transition,
  notification: state.notification,
  hasRecipesData: state.hasRecipesData
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      dispatchFetchRecipes: fetchRecipes,
      dispatchSetCurSeason: setCurSeason,
      dispatchFetchUsers: fetchUsers,
      dispatchHideTransition: hideTransition,
      dispatchHideNotification: hideNotification
    }
  )(App)
);
