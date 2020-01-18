import React from "react";
import "./App.scss";
import Header from "./components/header/header.component";
import { Route, Switch } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.page";
import Footer from "./components/footer/footer.component";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
