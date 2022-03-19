import "./App.css";
import "./css/bootstrap.min.css";
import About from "./components/about/About";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import Demos from "./components/demos/Demos";
import Contact from "./components/contact/Contact";
import { Routes, Route } from "react-router-dom";
import Vinyl from "./components/vinyl/Vinyl";
import Digital from "./components/digital/Digital";
import Social from "./components/social/Social";
import AddRelease from "./components/addRelease/AddRelease";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="demos" element={<Demos />} />
        <Route path="contact" element={<Contact />} />
        <Route path="vinyl" element={<Vinyl />} />
        <Route path="digital" element={<Digital />} />
        <Route path="digital/addRelease" element={<AddRelease />} />
      </Routes>
      <Social />
    </div>
  );
}

export default App;
