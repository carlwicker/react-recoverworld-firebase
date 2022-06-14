import css from "./DigitalRelease.module.css";
import { Col, Row, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ITrack from "../../../interfaces/ITrack";
import DigitalTrack from "../digitalReleaseItem/DigitalTrack";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${catNum}: ${release?.artist} - ${release?.title}`}</title>
        <link href={`http://recoverworld.com/digital/${catNum}`} />
        <meta name="og:description" content={`${release?.label}`}></meta>
        <meta
          name="og:title"
          content={`${catNum}: ${release?.artist} - ${release?.title}`}
        ></meta>
        <meta name="author" content="Chris Hampshire"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          property="og:image"
          content={`https://firebasestorage.googleapis.com/v0/b/recoverworld-d5ab4.appspot.com/o/theCube..webp?alt=media&token=${process.env.REACT_APP_IMAGE_TOKEN}`}
        />
      </Helmet>

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
            {release.trackListing?.map((track: ITrack, index: number) => {
              return (
                <DigitalTrack
                  track={track}
                  key={index}
                  index={index}
                  ampsuiteId={release.ampsuiteReleaseId}
                />
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
}
