import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import DigitalSearchFilter from "./DigitalSearchFilter";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import DigitalReleaseList from "./DigitalReleaseList";

export default function Digital() {
  const [releases, setReleases] = useState<any | []>([]);

  // Get All Releases from Firestore
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

  // Actions
  function updateReleaseList() {
    getReleases();
  }

  return (
    <Container style={{ textAlign: "left" }}>
      {/* Header And Admin Controls */}
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

      {/* Search And Filter */}
      <DigitalSearchFilter />

      {/* Release list */}
      <DigitalReleaseList
        releases={releases}
        updateReleaseList={updateReleaseList}
      />
    </Container>
  );
}
