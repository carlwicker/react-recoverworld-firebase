import IRelease from "../../../interfaces/IRelease";
import { doc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ITrack from "../../../interfaces/ITrack";
import DigitalTrack from "./DigitalTrack";

interface IDigitalReleaseItem {
  release: IRelease;
  updateReleaseList: Function;
  isAdmin: boolean;
}

export default function DigitalReleaseItem({
  release,
  updateReleaseList,
  isAdmin,
}: IDigitalReleaseItem) {
  async function deleteRelease(releaseId: string) {
    await deleteDoc(doc(db, "releases", releaseId));
    updateReleaseList();
  }

  async function addToFeaturedReleases(release: IRelease) {
    const docRef = await addDoc(collection(db, "featured"), release);
    console.log("Document written with ID: ", docRef.id);
  }

  return (
    <div
      className="mb-2"
      style={{
        display: "flex",
        gap: "5px",
        borderBottom: "1px dashed #555",
      }}
    >
      <Row style={{ padding: "50px 20px" }}>
        <Col md="auto">
          <Card.Img
            variant="top"
            src={release?.artwork}
            style={{ width: "160px" }}
          />
        </Col>

        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
            justifyContent: "center",
          }}
        >
          <Card.Subtitle className="text-muted">
            {/* <Badge bg="primary">New Release</Badge> */}
            <div
              style={{
                fontWeight: "200",
                fontSize: "12px",
                display: "flex",
                gap: "10px",
              }}
              className="pt-2"
            >
              {window.location.pathname === "/digital" && (
                <Link to={`./${release.catNum}`}>{release.catNum}</Link>
              )}

              {window.location.pathname.includes("label") && (
                <Link to={`../digital/${release.catNum}`}>
                  {release.catNum}
                </Link>
              )}

              {release.label}
            </div>
          </Card.Subtitle>
          <Card.Title
            style={{
              marginBottom: "0",
              paddingTop: "0",
              textTransform: "uppercase",
              fontWeight: "800",
            }}
          >
            {release.title}
          </Card.Title>
          <Card.Title
            style={{
              marginBottom: "0",
              paddingTop: "0",
              textTransform: "capitalize",
              fontWeight: "200",
            }}
          >
            {release.artist}
          </Card.Title>

          {/* Track Listing */}
          <div
            style={{
              marginTop: "20px",
            }}
          >
            {release.trackListing.map((track: ITrack, index: number) => {
              return <DigitalTrack track={track} key={index} index={index} />;
            })}
          </div>

          {/* Admin Edit / Delete Buttons */}
          {isAdmin && (
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <Link to={"/digital/" + release.id + "/edit"}>
                <Button variant="outline-warning">Edit</Button>
              </Link>
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteRelease(release.id);
                }}
              >
                Delete
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => addToFeaturedReleases(release)}
              >
                Add to Featured
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
