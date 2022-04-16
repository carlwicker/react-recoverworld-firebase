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
import AddRelease from "./components/digital/addRelease/AddRelease";
import EditRelease from "./components/digital/editRelease/EditRelease";
import Merchandise from "./components/merchandise/Merchandise";
import AmpsuiteXMLReleaseParser from "./components/utility/AmpsuiteXMLReleaseParser";
import AddMerchandise from "./components/merchandise/AddProduct";
import EditProduct from "./components/merchandise/EditProduct";
import RadioBanner from "./components/mainCarasel/MainCarasel";
import Release from "./components/Release/Release";

function App() {
  return (
    <div className="wrapper">
      <div className="App">
        <NavBar />
        <RadioBanner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="demos" element={<Demos />} />
          <Route path="contact" element={<Contact />} />
          <Route path="vinyl" element={<Vinyl />} />
          <Route path="digital" element={<Digital />} />
          <Route path="merchandise" element={<Merchandise />} />
          <Route path="digital/addRelease" element={<AddRelease />} />
          <Route path="digital/:releaseId/edit" element={<EditRelease />} />
          <Route
            path="ampsuite/release/import"
            element={<AmpsuiteXMLReleaseParser />}
          />
          <Route path="merchandise/add" element={<AddMerchandise />} />
          <Route path="merchandise/:id/edit" element={<EditProduct />} />
          <Route path="digital/:catNum" element={<Release />} />
        </Routes>
        <Social />
      </div>
    </div>
  );
}

export default App;
