import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import DigitalFilter from "./DigitalFilter";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import DigitalReleaseList from "./DigitalReleaseList";

export default function Digital() {
  const releaseImg = require("../../img/iconise1.webp");
  const [releases, setReleases] = useState<any | []>([]);

  async function getReleases() {
    const releasesRef = await collection(db, "releases");

    getDocs(releasesRef).then((snapshot) => {
      let releaseArr: any[] = [];
      snapshot.forEach((release) => {
        releaseArr.push({ ...release.data(), id: release.id });
      });
      setReleases(releaseArr);
    });
  }

  useEffect(() => {
    getReleases();
  }, []);

  function updateReleaseList() {
    getReleases();
  }

  // useEffect(() => {
  //   console.log(releases);
  // }, [releases]);

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
      <DigitalReleaseList
        releases={releases}
        updateReleaseList={updateReleaseList}
      />
    </Container>
  );
}
