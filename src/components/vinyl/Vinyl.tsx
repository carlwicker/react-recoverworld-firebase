import { Container, Row, Col } from "react-bootstrap";

interface IVinyl {
  setIsCaraselVisible: any;
}
export default function Vinyl({ setIsCaraselVisible }: IVinyl) {
  setIsCaraselVisible(true);
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
