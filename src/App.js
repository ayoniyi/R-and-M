import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//import Header from "./UI/Header";
import Footer from "./UI/Footer";

import Home from "./pages/Home";
import SingleCharacter from "./pages/SingleCharacter";

import Characters from "./pages/Characters";
import About from "./pages/About";
import Episodes from "./pages/Episodes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home">
            <Redirect to="/" />
          </Route>
          <Route exact path="/characters" component={Characters} />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/character/:characterId"
            component={SingleCharacter}
          />
          <Route exact path="/episodes" component={Episodes} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
