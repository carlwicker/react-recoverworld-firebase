import { Container, Row, Col, Form } from "react-bootstrap";

export default function DigitalSearchFilter() {
  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formSearch">
              <Form.Label>Search</Form.Label>
              <Form.Control type="string" placeholder="Search..." />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Label Filter</Form.Label>
              <Form.Select aria-label="Default select example" className="mb-3">
                <option>Filter by label...</option>
                <option value="1">Discover Records</option>
                <option value="2">Discover Dark</option>
                <option value="2">Eve Records</option>
                <option value="2">Flux Delux</option>
                <option value="3">Iconise Records</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
