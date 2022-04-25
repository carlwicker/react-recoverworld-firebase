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
import Release from "./components/digital/digitalRelease/DigitalRelease";
import { ThemeProvider, Container } from "react-bootstrap";
import { useState } from "react";
import Label from "./components/label/Label";
import Admin from "./components/admin/Admin";
import Login from "./components/admin/Login";

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
    >
      <Container>
        <div className="App">
          <NavBar isAdmin={isAdmin} />
          <Routes>
            <Route path="/" element={<Home isAdmin={isAdmin} />} />
            <Route path="about" element={<About />} />
            <Route path="demos" element={<Demos />} />
            <Route path="contact" element={<Contact />} />
            <Route path="digital" element={<Digital isAdmin={isAdmin} />} />
            <Route
              path="merchandise"
              element={<Merchandise isAdmin={isAdmin} />}
            />
            <Route path="digital/addRelease" element={<AddRelease />} />
            <Route path="digital/:releaseId/edit" element={<EditRelease />} />
            <Route path="merchandise/add" element={<AddMerchandise />} />
            <Route path="merchandise/:id/edit" element={<EditProduct />} />
            <Route path="digital/:catNum" element={<Release />} />
            <Route
              path="digital/label/:label"
              element={<Label isAdmin={isAdmin} />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/admin/import"
              element={<AmpsuiteXMLReleaseParser />}
            />
            <Route
              path="/login"
              element={<Login setUser={setUser} setIsAdmin={setIsAdmin} />}
            />
          </Routes>

          <Social />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
