import { Container, Row, Col } from "react-bootstrap";

export default function Vinyl() {
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
          <h1>Vinyl Store</h1>
        </Col>
      </Row>
    </Container>
  );
}
