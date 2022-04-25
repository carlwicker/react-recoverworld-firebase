import css from "./FeaturedItem.module.css";
import { Image, Col, Row, Badge, Button } from "react-bootstrap";
import IRelease from "../../../interfaces/IRelease";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import DigitalTrack from "../digitalReleaseItem/DigitalTrack";
import { Link } from "react-router-dom";
import ITrack from "../../../interfaces/ITrack";

interface IDigitalReleaseItem {
  release: IRelease;
  getFeaturedReleases: Function;
  isAdmin: boolean;
}

export default function DigitalReleaseItem({
  release,
  getFeaturedReleases,
  isAdmin,
}: IDigitalReleaseItem) {
  async function deleteFeaturedItem(id: string) {
    await deleteDoc(doc(db, "featured", id));
  }

  return (
    <Row className={css["release-item"]}>
      <Col md="auto">
        <Image src={release?.artwork} className={css["release-image"]} />
      </Col>

      <Col className={css["release-details"]}>
        <Badge bg="danger" className={css["release-badge"]}>
          New Release
        </Badge>

        <div className={css["release-cat-group"]}>
          {window.location.pathname === "/digital" && (
            <Link to={`./${release?.catNum}`} className={css["release-cat"]}>
              {release.catNum}
            </Link>
          )}

          {window.location.pathname === "/" && (
            <Link
              to={`./digital/${release?.catNum}`}
              className={css["release-cat"]}
            >
              {release.catNum}
            </Link>
          )}

          {window.location.pathname.includes("labels") && (
            <Link
              to={`../../${release?.catNum}`}
              className={css["release-cat"]}
            >
              {release.catNum}
            </Link>
          )}
          {" | "}
          <Link
            to={`../digital/label/${release.label}`}
            className={css["release-label"]}
          >
            {release.label}
          </Link>
        </div>

        <div className={css["release-title"]}>{release.title}</div>
        <div className={css["release-artist"]}>{release.artist}</div>

        {/* Track Listing */}
        <div className={css["release-tracklisting"]}>
          {release.trackListing.map((track: ITrack, index: number) => {
            return <DigitalTrack track={track} key={index} index={index} />;
          })}
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className={css["admin-control-group"]}>
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
}
