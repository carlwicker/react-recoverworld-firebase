import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import IRelease from "../../interfaces/IRelease";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import DigitalTrack from "./digitalReleaseItem/DigitalTrack";
import { Link } from "react-router-dom";
import ITrack from "../../interfaces/ITrack";

interface IDigitalReleaseItem {
  release: IRelease;
  getFeaturedReleases: Function;
}

export default function DigitalReleaseItem({
  release,
  getFeaturedReleases,
}: IDigitalReleaseItem) {
  const isAdmin: boolean = true;

  async function deleteFeaturedItem(id: string) {
    await deleteDoc(doc(db, "featured", id));
  }

  return (
    <div
      className="featured-"
      style={{
        display: "flex",
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
          <>
            <Badge
              bg="danger"
              style={{ textTransform: "uppercase", width: "fit-content" }}
            >
              New Release
            </Badge>
            <div
              style={{
                fontWeight: "200",
                fontSize: "12px",
                display: "flex",
                gap: "10px",
              }}
              className="pt-2 text-muted"
            >
              {window.location.pathname === "/digital" && (
                <Link to={`./${release.catNum}`}>{release.catNum}</Link>
              )}

              {window.location.pathname.includes("labels") && (
                <Link to={`../../${release.catNum}`}>{release.catNum}</Link>
              )}

              {release.label}
            </div>
          </>
          <div
            style={{
              marginBottom: "0",
              paddingTop: "0",
              textTransform: "uppercase",
              fontWeight: "800",
            }}
          >
            {release.title}
          </div>
          <div
            style={{
              marginBottom: "0",
              paddingTop: "0",
              textTransform: "capitalize",
              fontWeight: "200",
            }}
          >
            {release.artist}
          </div>

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
          )}
        </Col>
      </Row>
      );
    </div>
  );
}
