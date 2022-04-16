import { Container, Col, Row, Badge, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ITrack from "../../interfaces/ITrack";
import DigitalTrack from "../digital/digitalReleaseItem/DigitalTrack";

interface IRelease {
  setIsCaraselVisible: any;
}

export default function Release({ setIsCaraselVisible }: IRelease) {
  setIsCaraselVisible(false);
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
    <Container style={{ textAlign: "left" }}>
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
            {/* <Badge
              bg="danger"
              style={{ textTransform: "uppercase", width: "fit-content" }}
            >
              New Release
            </Badge> */}
            <div
              style={{ fontWeight: "200", fontSize: "12px" }}
              className="pt-2 text-muted"
            >
              {release.catNum} | {release.label}
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
            {release?.trackListing?.map((track: ITrack, index: number) => {
              return <DigitalTrack track={track} key={index} index={index} />;
            })}
          </div>

          {/* Admin Edit / Delete Buttons */}
          {/* {isAdmin ? (
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
          )} */}
        </Col>
      </Row>
    </Container>
  );
}
