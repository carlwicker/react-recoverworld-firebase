import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FeaturedReleases from "./FeaturedReleases";
import DigitalSearchFilter from "./DigitalSearchFilter";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import DigitalReleaseList from "./DigitalReleaseList";
import IRelease from "../../interfaces/IRelease";

interface IDigital {
  setIsCaraselVisible: any;
}

export default function Digital({ setIsCaraselVisible }: IDigital) {
  const [releases, setReleases] = useState<IRelease[] | []>([]);
  const [filteredReleases, setFilteredReleases] = useState<IRelease[] | []>([]);
  const [labelFilteredResults, setLabelFilteredResults] = useState<
    IRelease[] | []
  >([]);
  const isAdmin: boolean = false;
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  // Get All Releases from Firestore
  async function getReleases() {
    const q = await query(
      collection(db, "releases"),
      where("label", "==", selectedLabel),
      limit(500),
      orderBy("releaseDate", "desc")
    );

    const querySnapshot = await getDocs(q);
    let releaseArr: any[] = [];
    querySnapshot.forEach((release) => {
      releaseArr.push({ ...release.data(), id: release.id });
    });

    setReleases(releaseArr);
    releaseArr = [];
  }

  // Show Carousel
  useEffect(() => {
    setIsCaraselVisible(false);
  }, []);

  // Initalise Release List
  useEffect(() => {
    setLabelFilteredResults(releases);
  }, [releases]);

  useEffect(() => {
    getReleases();
  }, [selectedLabel]);

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
        <h2>{selectedLabel ? selectedLabel : "Select A Label"}</h2>

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
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel}
      />

      {/* Release list */}
      <DigitalReleaseList
        releases={releases}
        updateReleaseList={updateReleaseList}
        labelFilteredResults={labelFilteredResults}
      />

      <FeaturedReleases />
    </Container>
  );
}
