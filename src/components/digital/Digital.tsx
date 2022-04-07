import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import DigitalSearchFilter from "./DigitalSearchFilter";
import { collection, getDocs, limit } from "firebase/firestore";
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
  const isAdmin: boolean = false;

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

  // Initalise Release List
  useEffect(() => {
    setLabelFilteredResults(releases);
  }, [releases]);

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
        <h1>Digital Hub</h1>

        {/* Admin Add Release Button */}
        {isAdmin ? (
          <Col style={{ display: "flex", justifyContent: "end" }}>
            <Link to="/digital/addRelease">
              <Button variant="primary">Add Release</Button>
            </Link>
          </Col>
        ) : (
          ""
        )}
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
