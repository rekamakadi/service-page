import { Suspense } from "react";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Services } from "./components/Services2";
// import { Projects } from "./components/Projects";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
      <div className="App">
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Banner />
          <Services />
          {/* <Projects /> */}
          <Contact />
          <Footer />
        </Suspense>
      </div>
  );
}

export default App;
