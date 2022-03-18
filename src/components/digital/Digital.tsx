import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsSpotify, BsYoutube } from "react-icons/bs";
import { SiBeatport, SiSoundcloud } from "react-icons/si";

export default function Vinyl() {
  const releaseImg = require("../../img/iconise1.webp");

  return (
    <Container>
      <Row>
        <Col
          md={6}
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Digital Hub</h1>

          <Card>
            <Card.Body>
              <Row className="pb-3">
                <Col md="auto">
                  <Card.Img
                    variant="top"
                    src={releaseImg}
                    style={{ borderRadius: "50%", width: "130px" }}
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
                  <Card.Subtitle className="mb-2 text-muted">
                    IC008 | Iconise Records
                  </Card.Subtitle>
                  <Card.Title as={"h3"} style={{ marginBottom: "0" }}>
                    Reactivate{" "}
                  </Card.Title>{" "}
                  <Card.Title as={"h4"}>Carl Wicker</Card.Title>{" "}
                </Col>

                <Col md="auto">
                  <Badge bg="warning">New Release</Badge>
                </Col>
              </Row>

              <Row>
                <Col>
                  <ListGroup as="ol" numbered>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <Col>
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Reactivate</div>
                          Original Mix
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
                        <Link to={"#"}>
                          <BsYoutube style={{ fontSize: "2em" }} />
                        </Link>
                        <Link to={"#"}>
                          <BsSpotify style={{ fontSize: "2em" }} />
                        </Link>
                        <Link to={"#"}>
                          <SiSoundcloud style={{ fontSize: "2em" }} />
                        </Link>
                        <Link to={"#"}>
                          <SiBeatport style={{ fontSize: "2em" }} />
                        </Link>
                      </Col>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <Col>
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Bong Go</div>
                          Deep Depression Mix
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
                        <Link to={"#"}>
                          <BsYoutube style={{ fontSize: "2em" }} />
                        </Link>
                        <Link to={"#"}>
                          <BsSpotify style={{ fontSize: "2em" }} />
                        </Link>
                        <Link to={"#"}>
                          <SiBeatport style={{ fontSize: "2em" }} />
                        </Link>
                      </Col>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
