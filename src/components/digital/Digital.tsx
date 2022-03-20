import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsSpotify, BsYoutube } from "react-icons/bs";
import { SiBeatport, SiSoundcloud } from "react-icons/si";
import DigitalFilter from "./DigitalFilter";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import DigitalTracklisting from "./DigitalTracklisting";

export default function Digital() {
  const releaseImg = require("../../img/iconise1.webp");
  const [releases, setReleases] = useState<any | []>([]);

  useEffect(() => {
    async function getReleases() {
      const releasesRef = await collection(db, "releases");

      await getDocs(releasesRef).then((snapshot) => {
        let releaseArr: any[] = [];
        snapshot.forEach((release) => {
          releaseArr.push(release.data());
        });
        setReleases(releaseArr);
      });
    }

    getReleases();
  }, []);

  useEffect(() => {
    console.log(releases);
  }, [releases]);

  return (
    <Container style={{ textAlign: "left" }}>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col>
          <h1>Digital Hub</h1>
        </Col>
        <Col style={{ display: "flex", justifyContent: "end" }}>
          <Link to="/digital/addRelease">
            <Button variant="primary">Add Release</Button>
          </Link>
        </Col>
      </Row>

      <DigitalFilter />
      <DigitalTracklisting releases={releases} />
    </Container>
  );
}
