import css from "./DigitalRelease.module.css";
import { Col, Row, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ITrack from "../../../interfaces/ITrack";
import DigitalTrack from "../digitalReleaseItem/DigitalTrack";
import { Link } from "react-router-dom";

interface IDigitalRelease {}

export default function DigitalRelease({}: IDigitalRelease) {
  const { catNum } = useParams();
  const [release, setRelease] = useState<any | {}>({});

  async function getRelease() {
    const releasesRef = collection(db, "releases");
    const q = query(releasesRef, where("catNum", "==", catNum));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      setRelease({ id: doc.id, ...doc.data() });
    });
  }

  useEffect(() => {
    getRelease();
  }, [catNum]);

  return (
    <>
      <h2>{catNum}</h2>
      <Row className={css["release-item"]}>
        <Col md="auto">
          <Image src={release?.artwork} className={css["release-image"]} />
        </Col>

        <Col className={css["release-details"]}>
          <div className={css["release-cat-group"]}>
            {release.catNum} |{" "}
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
        </Col>
      </Row>
    </>
  );
}
