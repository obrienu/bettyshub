import React, { Component } from "react";
import Collection from "../../components/collection/collection.component";
import AllCollection from "../../components/collection.all/collection.all.component";
import { Route, withRouter } from "react-router-dom";
import ShowPage from "../shop.show.page/show.page.component";

export class Fabric extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <Route
          exact
          path={`${match.path}`}
          render={() => <AllCollection shop={"fabric"} />}
        />
        <Route
          path={`${match.path}/:category`}
          render={() => <Collection shop={"fabric"} />}
        />
        <Route
          path={`${match.path}/:category/:commId`}
          render={() => <ShowPage shop={"fabric"} />}
        />
      </div>
    );
  }
}

export default withRouter(Fabric);
