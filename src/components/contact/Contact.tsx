import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IContact {}

export default function Contact({}: IContact) {
  return (
    <Row style={{ marginTop: "50vh" }}>
      <Col md={8}>
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
            label="I confirm this message is not related to demo submissions."
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
