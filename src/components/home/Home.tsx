import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
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
          <h1>Home</h1>
        </Col>
      </Row>
    </Container>
  );
}
