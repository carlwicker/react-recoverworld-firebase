import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Contact() {
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
          <h1>Contact</h1>
          <p>
            Send us an email using the form below, or contact us on{" "}
            <Link to="https://www.facebook.com/Recoverworld">Facebook</Link>.
          </p>
          <p>
            <b>PLEASE NOTE:</b> All demo submissions must follow the procedure
            on our <Link to="/demos">demos page</Link>.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
