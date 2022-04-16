import { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IContact {
  setIsCaraselVisible: any;
}

export default function Contact({ setIsCaraselVisible }: IContact) {
  useEffect(() => {
    setIsCaraselVisible(false);
  }, []);

  return (
    <Container style={{ marginTop: "50vh" }}>
      <Row>
        <Col
          md={4}
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <h2>Contact</h2> */}
          <p>
            Send us an email using the form below, or contact us on{" "}
            <Link to="https://www.facebook.com/Recoverworld">Facebook</Link>.
          </p>

          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
            <Form.Check
              className="mb-3"
              type="checkbox"
              id="form-accept"
              label="I confirm this message is not related to Demo Submissions."
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
