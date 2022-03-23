import { Card, Row, Col, Badge, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsSpotify, BsYoutube } from "react-icons/bs";
import { SiBeatport, SiSoundcloud } from "react-icons/si";
import IRelease from "../../interfaces/IRelease";
import ITrack from "../../interfaces/ITrack";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface IDigitalReleaseItem {
  release: IRelease;
  updateReleaseList: Function;
}

export default function DigitalReleaseItem({
  release,
  updateReleaseList,
}: IDigitalReleaseItem) {
  async function deleteRelease(releaseId: string) {
    await deleteDoc(doc(db, "releases", releaseId));
    updateReleaseList();
  }

  return (
    <Card className="mb-2">
      <Card.Body>
        <Row className="pb-3">
          <Col md="auto">
            <Card.Img
              variant="top"
              src={release.artwork}
              style={{ width: "130px" }}
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
              <Badge bg="primary">New Release</Badge>
              <div style={{ fontWeight: "200" }} className="pt-2">
                {release.catNum} | {release.label}
              </div>
            </Card.Subtitle>
            <Card.Title
              as={"h3"}
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
                textTransform: "uppercase",
                fontWeight: "200",
              }}
            >
              {release.artist}
            </Card.Title>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div>
              <Link to={"/digital/" + release.id + "/edit"}>
                <Button
                  variant="outline-warning"
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteRelease(release.id);
                }}
              >
                Delete
              </Button>
            </div>
          </Col>
        </Row>

        <Card>
          <ListGroup as="ol" numbered>
            {release.trackListing.map((track: ITrack, index: number) => {
              return (
                <ListGroup.Item
                  key={index}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <Col>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">
                        {track.title} - {track.artist}
                      </div>
                      {track.mix}
                    </div>
                  </Col>

                  <Col
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "end",
                      alignSelf: "center",
                    }}
                  >
                    {track.youtube !== "" ? (
                      <a href={track.youtube} target="blank">
                        <BsYoutube
                          style={{ fontSize: "2em", color: "white" }}
                        />
                      </a>
                    ) : (
                      ""
                    )}
                    {track.spotify !== "" ? (
                      <a href={track.spotify} target="blank">
                        <BsSpotify
                          style={{ fontSize: "2em", color: "white" }}
                        />
                      </a>
                    ) : (
                      ""
                    )}
                    {track.soundcloud !== "" ? (
                      <a href={track.soundcloud} target="blank">
                        <SiSoundcloud
                          style={{ fontSize: "2em", color: "white" }}
                        />
                      </a>
                    ) : (
                      ""
                    )}
                    {track.beatport !== "" ? (
                      <a href={track.beatport} target="blank">
                        <SiBeatport
                          style={{ fontSize: "2em", color: "white" }}
                        />
                      </a>
                    ) : (
                      ""
                    )}
                  </Col>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </Card.Body>
    </Card>
  );
}
