import React, { Fragment } from "react";
import "./App.scss";
import Header from "./components/header/header.component";
import { Route, Switch } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.page";
import Footer from "./components/footer/footer.component";
import AdminPage from "./pages/admin/admin.component";
import Fabric from "./pages/fabric/fabric.component";
import Accessories from "./pages/accessories/accessories.component";
function App() {
  return (
    <div>
      <Header />
      <div className="Main">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/bettyhubs/admin" component={AdminPage} />
          <Route path="/fabric" component={Fabric} />
          <Route path="/accessories" component={Accessories} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
