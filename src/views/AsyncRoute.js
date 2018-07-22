import React from "react";

class AsyncRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.props.loadingPromise.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }

  render() {
    return this.state.loaded ? (
      <this.component {...this.props.props} />
    ) : (
      <div className="container" style={{ paddingTop: "8rem", marginTop: "8rem" }}>
        <div className="loader-container">
          <div className="loader">Chargement...</div>
        </div>
      </div>
    );
  }
}

export default AsyncRoute;
