import React from "react";

class AsyncRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { LoadedComponent: null };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.loadingPromise.then(module => {
      if (this._isMounted) {
        this.setState({ LoadedComponent: module.default });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { LoadedComponent } = this.state;
    if (!LoadedComponent) {
      return (
        <div className="container" style={{ paddingTop: "8rem", marginTop: "8rem" }}>
          <div className="loader-container">
            <div className="loader">Chargement...</div>
          </div>
        </div>
      );
    }

    // Forward all props except 'loadingPromise'
    const { loadingPromise, ...restProps } = this.props;

    return <LoadedComponent {...restProps} />;
  }
}

export default AsyncRoute;