import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import DigitalSearchFilter from "./DigitalSearchFilter";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import DigitalReleaseList from "./DigitalReleaseList";
import IRelease from "../../interfaces/IRelease";

export default function Digital() {
  const [releases, setReleases] = useState<any | []>([]);
  const [filteredReleases, setFilteredReleases] = useState<IRelease[] | []>([]);
  const [labelFilteredResults, setLabelFilteredResults] = useState<any | []>(
    []
  );

  useEffect(() => {
    setLabelFilteredResults(releases);
  }, [releases]);

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
      <DigitalSearchFilter
        releases={releases}
        setFilteredReleases={setFilteredReleases}
        filteredReleases={filteredReleases}
        labelFilteredResults={labelFilteredResults}
        setLabelFilteredResults={setLabelFilteredResults}
      />

      {/* Release list */}
      <DigitalReleaseList
        releases={releases}
        updateReleaseList={updateReleaseList}
        labelFilteredResults={labelFilteredResults}
      />
    </Container>
  );
}
