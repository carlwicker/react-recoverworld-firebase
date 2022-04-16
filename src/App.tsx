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

import { useState } from "react";

function App() {
  const [isCaraselVisible, setIsCaraselVisible] = useState<Boolean>(false);

  return (
    <div className="wrapper">
      <div className="App">
        <NavBar />
        {isCaraselVisible ? <RadioBanner /> : null}
        <Routes>
          <Route
            path="/"
            element={<Home setIsCaraselVisible={setIsCaraselVisible} />}
          />
          <Route
            path="about"
            element={<About setIsCaraselVisible={setIsCaraselVisible} />}
          />
          <Route
            path="demos"
            element={<Demos setIsCaraselVisible={setIsCaraselVisible} />}
          />
          <Route
            path="contact"
            element={<Contact setIsCaraselVisible={setIsCaraselVisible} />}
          />
          <Route
            path="vinyl"
            element={<Vinyl setIsCaraselVisible={setIsCaraselVisible} />}
          />
          <Route
            path="digital"
            element={<Digital setIsCaraselVisible={setIsCaraselVisible} />}
          />
          <Route
            path="merchandise"
            element={<Merchandise setIsCaraselVisible={setIsCaraselVisible} />}
          />
          <Route path="digital/addRelease" element={<AddRelease />} />
          <Route path="digital/:releaseId/edit" element={<EditRelease />} />
          <Route
            path="ampsuite/release/import"
            element={<AmpsuiteXMLReleaseParser />}
          />
          <Route path="merchandise/add" element={<AddMerchandise />} />
          <Route path="merchandise/:id/edit" element={<EditProduct />} />
          <Route
            path="digital/:catNum"
            element={<Release setIsCaraselVisible={setIsCaraselVisible} />}
          />
        </Routes>
        <Social />
      </div>
    </div>
  );
}

export default App;
