import css from "./DigitalReleaseItem.module.css";
import IRelease from "../../../interfaces/IRelease";
import { doc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { Card, Row, Col, Button } from "react-bootstrap";
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
    <Row className={css["release-item"]}>
      <Col md="auto">
        <Card.Img src={release?.artwork} className={css["release-image"]} />
      </Col>

      <Col className={css["release-details"]}>
        <div className={css["release-cat-group"]}>
          {window.location.pathname === "/digital" && (
            <Link to={`./${release.catNum}`} className={css["release-cat"]}>
              {release.catNum}
            </Link>
          )}

          {window.location.pathname.includes("label") && (
            <Link
              to={`../digital/${release.catNum}`}
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
          {release?.trackListing?.map((track: ITrack, index: number) => {
            return <DigitalTrack track={track} key={index} index={index} />;
          })}
        </div>

        {/* Admin */}
        {isAdmin && (
          <div className={css["admin-control-group"]}>
            <Link to={"/digital/" + release.id + "/edit"}>
              <Button variant="outline-warning">Edit</Button>
            </Link>
            <div>
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteRelease(release.id);
                }}
              >
                Delete
              </Button>
            </div>
            <div>
              <Button
                variant="outline-primary"
                onClick={() => addToFeaturedReleases(release)}
              >
                Add to Featured
              </Button>
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
}
