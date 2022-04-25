import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FeaturedReleases from "./FeaturedReleases";
import DigitalSearchFilter from "./digitalLabelDropDown/DigitalLabelDropDown";
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
  isAdmin: boolean;
}

export default function Digital({ setIsCaraselVisible, isAdmin }: IDigital) {
  const [releases, setReleases] = useState<IRelease[] | []>([]);
  const [labelFilteredResults, setLabelFilteredResults] = useState<
    IRelease[] | []
  >([]);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [labels, setLabels] = useState<any>([]);

  // Get Labels from Firestore
  async function getLabelsFromFirestore() {
    let labelsArr: any = ["Select A Label..."];
    const querySnapshot = await getDocs(collection(db, "labels"));
    querySnapshot.forEach((doc) => {
      labelsArr.push(doc.data().labelName);
    });
    setLabels(labelsArr);
  }

  useEffect(() => {
    getLabelsFromFirestore();
  }, []);

  // Get all releases from Firestore by selected record label.
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
    <Container>
      {/* Header And Admin Controls */}
      <Row
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col>
          <h2>{selectedLabel ? selectedLabel : "Select A Label"}</h2>
        </Col>

        {/* Admin Add Release Button */}
        {isAdmin && (
          <Col style={{ display: "flex", justifyContent: "end" }}>
            <Link to="/digital/addRelease">
              <Button variant="primary">Manually Add Release</Button>
            </Link>
          </Col>
        )}
      </Row>

      {/* SelectLabel */}
      <DigitalSearchFilter
        setSelectedLabel={setSelectedLabel}
        labels={labels}
      />

      {/* Release list */}
      <DigitalReleaseList
        releases={releases}
        updateReleaseList={updateReleaseList}
        labelFilteredResults={labelFilteredResults}
        isAdmin={isAdmin}
      />

      <FeaturedReleases isAdmin={isAdmin} />
    </Container>
  );
}
