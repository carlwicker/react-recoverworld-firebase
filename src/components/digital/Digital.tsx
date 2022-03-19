import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsSpotify, BsYoutube } from "react-icons/bs";
import { SiBeatport, SiSoundcloud } from "react-icons/si";
import DigitalFilter from "./DigitalFilter";

export default function Digital() {
  const releaseImg = require("../../img/iconise1.webp");

  return (
    <Container style={{ textAlign: "left" }}>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col>
          <h1>Digital Hub</h1>
        </Col>
        <Col style={{ display: "flex", justifyContent: "end" }}>
          <Link to="/digital/addRelease">
            <Button variant="primary">Add Release</Button>
          </Link>
        </Col>
      </Row>

      <DigitalFilter />

      <Row>
        <Col
          md={12}
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
                  <Card.Subtitle className="text-muted">
                    <Badge bg="primary">New Release</Badge>
                    <div style={{ fontWeight: "200" }} className="pt-2">
                      IC008 | Iconise Records
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
                    Reactivate EP
                  </Card.Title>
                  <Card.Title
                    style={{
                      marginBottom: "0",
                      paddingTop: "0",
                      textTransform: "uppercase",
                      fontWeight: "200",
                    }}
                  >
                    Carl Wicker
                  </Card.Title>
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
                          <div className="fw-bold">
                            Carl Wicker - Reactivate
                          </div>
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
                          <BsYoutube
                            style={{ fontSize: "2em", color: "white" }}
                          />
                        </Link>
                        <Link to={"#"}>
                          <BsSpotify
                            style={{ fontSize: "2em", color: "white" }}
                          />
                        </Link>
                        <Link to={"#"}>
                          <SiSoundcloud
                            style={{ fontSize: "2em", color: "white" }}
                          />
                        </Link>
                        <Link to={"#"}>
                          <SiBeatport
                            style={{ fontSize: "2em", color: "white" }}
                          />
                        </Link>
                      </Col>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <Col>
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Carl Wicker - Bong Go</div>
                          Deeper Disco Mix
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
                          <BsYoutube
                            style={{ fontSize: "2em", color: "white" }}
                          />
                        </Link>
                        <Link to={"#"}>
                          <BsSpotify
                            style={{ fontSize: "2em", color: "white" }}
                          />
                        </Link>
                        <Link to={"#"}>
                          <SiBeatport
                            style={{ fontSize: "2em", color: "white" }}
                          />
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
