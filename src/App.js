import "./App.css";
import {
  //BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//import Header from "./UI/Header";
import Footer from "./UI/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import SingleCharacter from "./pages/SingleCharacter";

import Characters from "./pages/Characters";
import About from "./pages/About";
import Episodes from "./pages/Episodes";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {/* <Router> */}
      <ScrollToTop>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
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
        </AnimatePresence>
      </ScrollToTop>
      {/* </Router> */}
    </div>
  );
}

export default App;
