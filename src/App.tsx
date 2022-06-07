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
import { useState, useEffect } from "react";
import Label from "./components/label/Label";
import Admin from "./components/admin/Admin";
import Login from "./components/admin/Login";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import FeaturedReleases from "./components/digital/featuredReleases/FeaturedReleases";
import Test from "./AmpsuiteImporter";
import { Helmet } from "react-helmet-async";

import { LazyVideo } from "react-lazy-media";
import video from "./img/theCube.webm";
import img from "./img/theCube..webp";

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [labels, setLabels] = useState<string[]>([]);

  // Get Labels from Firestore
  async function getLabelsFromFirestore() {
    let labelsArr: string[] = [];
    const labelsRef = await collection(db, "labels");
    const q = query(labelsRef, orderBy("labelName"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      labelsArr.push(doc.data().labelName);
    });
    setLabels(labelsArr);
  }

  useEffect(() => {
    getLabelsFromFirestore();
  }, []);

  return (
    <>
      <Helmet>
        <title>RecoverWorld Online: Home</title>
        <link rel="canonical" href="http://recoverworld.com" />
        <meta
          name="keywords"
          content="RecoverWorld, Dance Music, EDM, Trance, MP3, Wav, Digital, Techno, Chris Hampshire, AmpSuite, Music distribution, Music Publishing, Record Label, Record Label Services"
        ></meta>
        <meta name="author" content="Chris Hampshire"></meta>

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/recoverworld-d5ab4.appspot.com/o/theCube..webp?alt=media&token=b7f4f864-5e92-4990-b9a5-2f75215852a6"
        />
      </Helmet>

      <LazyVideo
        src={video}
        poster={img}
        id="the-cube"
        controls={false}
        autoplay={true}
        loop={true}
        muted={true}
        preload={false}
      />

      <div className="wrapper">
        {/* BootStrap theme provider */}
        <ThemeProvider
          breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        >
          <div className="App">
            <Container>
              <NavBar isAdmin={isAdmin} labels={labels} />
              <Routes>
                <Route path="/" element={<Home isAdmin={isAdmin} />} />
                <Route path="about" element={<About />} />
                <Route path="demos" element={<Demos />} />
                <Route path="contact" element={<Contact />} />
                <Route path="digital" element={<Digital isAdmin={isAdmin} />} />
                <Route
                  path="digital/new"
                  element={<FeaturedReleases isAdmin={isAdmin} />}
                />
                <Route
                  path="merchandise"
                  element={<Merchandise isAdmin={isAdmin} />}
                />
                <Route
                  path="digital/addRelease"
                  element={<AddRelease isAdmin={isAdmin} />}
                />
                <Route
                  path="digital/:releaseId/edit"
                  element={<EditRelease isAdmin={isAdmin} />}
                />
                <Route
                  path="merchandise/add"
                  element={<AddMerchandise isAdmin={isAdmin} />}
                />
                <Route
                  path="merchandise/:id/edit"
                  element={<EditProduct isAdmin={isAdmin} />}
                />
                <Route path="digital/:catNum" element={<Release />} />
                <Route
                  path="digital/label/:label"
                  element={<Label isAdmin={isAdmin} />}
                />
                <Route path="/admin" element={<Admin isAdmin={isAdmin} />} />
                <Route
                  path="/admin/import"
                  element={<AmpsuiteXMLReleaseParser isAdmin={isAdmin} />}
                />
                <Route
                  path="/login"
                  element={<Login setUser={setUser} setIsAdmin={setIsAdmin} />}
                />

                <Route path="/admin/massImport" element={<Test />} />
              </Routes>

              <Social />
            </Container>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
