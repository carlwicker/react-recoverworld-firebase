import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import IRelease from "../../interfaces/IRelease";
import ITrack from "../../interfaces/ITrack";
import DigitalTrack from "./digitalReleaseItem/DigitalTrack";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface IDigitalReleaseHeader {
  release: IRelease;
  getFeaturedReleases: Function;
}

export default function DigitalReleaseHeader({
  release,
  getFeaturedReleases,
}: IDigitalReleaseHeader) {
  const isAdmin: boolean = false;

  async function deleteFeaturedItem(id: string) {
    await deleteDoc(doc(db, "featured", id));
  }

  return (
    <Row style={{ padding: "5px 5px 20px 5px" }}>
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
          <Badge bg="danger" style={{ textTransform: "uppercase" }}>
            New Release
          </Badge>
          <div style={{ fontWeight: "200", fontSize: "12px" }} className="pt-2">
            {release.catNum} | {release.label}
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
        {isAdmin ? (
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <Button
              variant="outline-danger"
              onClick={() => {
                deleteFeaturedItem(release.id);
                getFeaturedReleases();
              }}
            >
              Remove Featured Item
            </Button>
          </div>
        ) : (
          ""
        )}
      </Col>
    </Row>
  );
}
