import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
  return (
    <ParallaxProvider>
      <div className="App">
        <NavBar />
        <Banner />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default App;
