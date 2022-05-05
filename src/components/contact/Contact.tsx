import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Contact() {
  const [email, setEmail] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  function sendMessageToSendGrid() {
    let sendObj = {
      email: email,
      msg: msg,
    };
    const url =
      "https://us-central1-recoverworld-d5ab4.cloudfunctions.net/app/email/send";
    axios.post(url, sendObj).catch((err) => console.error(err));
  }

  return (
    <Row style={{ marginTop: "50vh" }}>
      <Col md={8}>
        <p>
          Send us an email using the form below, or contact us on{" "}
          <Link to="https://www.facebook.com/Recoverworld">Facebook</Link>.
        </p>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessageToSendGrid();
            alert("Message Sent");
            navigate("/");
          }}
        >
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
