import "./App.css";
import "./css/bootstrap.min.css";
import About from "./components/about/About";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import Demos from "./components/demos/Demos";
import Contact from "./components/contact/Contact";
import { Routes, Route } from "react-router-dom";
import Digital from "./components/digital/Digital";
import Social from "./components/social/Social";
import AddRelease from "./components/digital/addRelease/AddRelease";
import EditRelease from "./components/digital/editRelease/EditRelease";
import Merchandise from "./components/merchandise/Merchandise";
import AmpsuiteXMLReleaseParser from "./components/utility/AmpsuiteXMLReleaseParser";
import AddMerchandise from "./components/merchandise/AddProduct";
import EditProduct from "./components/merchandise/EditProduct";
import RadioBanner from "./components/carousel/Carousel";
import Release from "./components/release/Release";

import { ThemeProvider, Container } from "react-bootstrap";
import { useState } from "react";
import Label from "./components/label/Label";
import Admin from "./components/admin/Admin";
import Login from "./components/admin/Login";

function App() {
  const [isCaraselVisible, setIsCaraselVisible] = useState<Boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
    >
      <Container>
        <div className="App">
          <NavBar isAdmin={isAdmin} />
          {isCaraselVisible ? <RadioBanner /> : null}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setIsCaraselVisible={setIsCaraselVisible}
                  isAdmin={isAdmin}
                />
              }
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
              path="digital"
              element={
                <Digital
                  setIsCaraselVisible={setIsCaraselVisible}
                  isAdmin={isAdmin}
                />
              }
            />
            <Route
              path="merchandise"
              element={
                <Merchandise
                  setIsCaraselVisible={setIsCaraselVisible}
                  isAdmin={isAdmin}
                />
              }
            />
            <Route path="digital/addRelease" element={<AddRelease />} />
            <Route path="digital/:releaseId/edit" element={<EditRelease />} />
            <Route path="merchandise/add" element={<AddMerchandise />} />
            <Route path="merchandise/:id/edit" element={<EditProduct />} />
            <Route
              path="digital/:catNum"
              element={<Release setIsCaraselVisible={setIsCaraselVisible} />}
            />
            <Route
              path="digital/label/:label"
              element={
                <Label
                  setIsCaraselVisible={setIsCaraselVisible}
                  isAdmin={isAdmin}
                />
              }
            />
            <Route
              path="/admin"
              element={<Admin setIsCaraselVisible={setIsCaraselVisible} />}
            />
            <Route
              path="/admin/import"
              element={
                <AmpsuiteXMLReleaseParser
                  setIsCaraselVisible={setIsCaraselVisible}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  user={user}
                  setUser={setUser}
                  isAdmin={isAdmin}
                  setIsAdmin={setIsAdmin}
                />
              }
            />
          </Routes>

          <Social />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
