import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import IRelease from "../../../interfaces/IRelease";

interface IDigitalReleaseHeader {
  release: IRelease;
  deleteRelease: Function;
}

export default function DigitalReleaseHeader({
  release,
  deleteRelease,
}: IDigitalReleaseHeader) {
  return (
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
            <Button variant="outline-warning" style={{ marginRight: "10px" }}>
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
  );
}