import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AddMerchandise() {
  const [product, setProduct] = useState<any>({
    productName: "",
    imageUrl: "",
    salesUrl: "",
    price: 0,
    amountOfSizes: 0,
    amountOfColours: 0,
  });

  async function addToFirestoreMerchandise() {
    const docRef = await addDoc(collection(db, "merchandise"), product);
    console.log("Document written with ID: ", docRef.id);
    window.location.href = "../../merchandise";
  }

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <Container style={{ textAlign: "left" }}>
      {/* Header */}
      <Row>
        <Col>
          <h1>Add Merchandise</h1>
        </Col>
      </Row>
      {/* Add Merchandise Form */}
      <Row>
        <Form.Group
          className="mb-3"
          controlId="editRelease"
          style={{ color: "black" }}
        >
          <InputGroup className="mb-3">
            <InputGroup.Text id="catNum" style={{ width: "170px" }}>
              Product Name:
            </InputGroup.Text>
            <FormControl
              type="string"
              onChange={(e: any) => {
                setProduct({ ...product, productName: e.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="input-artist" style={{ width: "170px" }}>
              Image URL:
            </InputGroup.Text>
            <Form.Control
              type="url"
              onChange={(e: any) => {
                setProduct({ ...product, imageUrl: e.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="input-title" style={{ width: "170px" }}>
              Sales URL:
            </InputGroup.Text>
            <Form.Control
              type="url"
              placeholder=""
              onChange={(e) => {
                setProduct({ ...product, salesUrl: e.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="input-image" style={{ width: "170px" }}>
              Price:
            </InputGroup.Text>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="input-image" style={{ width: "170px" }}>
              Amount of Sizes:
            </InputGroup.Text>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => {
                setProduct({ ...product, amountOfSizes: e.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="input-image" style={{ width: "170px" }}>
              Amount of Colours:
            </InputGroup.Text>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => {
                setProduct({ ...product, amountOfColours: e.target.value });
              }}
            />
          </InputGroup>

          <Button onClick={addToFirestoreMerchandise}>
            Add Merchandise Item
          </Button>
        </Form.Group>
      </Row>
    </Container>
  );
}
