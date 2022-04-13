import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditProduct() {
  let { id } = useParams();

  const [productId, setProductId] = useState<any>(id);
  const [product, setProduct] = useState<any | {}>({});

  async function getFirebaseProduct(productId: string) {
    const docRef = doc(db, "merchandise", productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.log("No such document!");
    }
  }

  async function updateFirestoreProduct(id: string) {
    await setDoc(doc(db, "merchandise", id), product);
    window.location.href = "../../merchandise";
  }

  useEffect(() => {
    setProductId(id);
    if (id) {
      getFirebaseProduct(id);
    }
  }, []);

  return (
    <Container style={{ textAlign: "left" }}>
      {/* Header */}
      <Row>
        <Col>
          <h1>Edit Merchandise</h1>
        </Col>
      </Row>
      {/* Add Merchandise Form */}
      <Row>
        <Form.Group
          className="mb-3"
          controlId="editProduct"
          style={{ color: "black" }}
        >
          <InputGroup className="mb-3">
            <InputGroup.Text id="catNum" style={{ width: "170px" }}>
              Product Name:
            </InputGroup.Text>
            <FormControl
              type="string"
              defaultValue={product.productName}
              onChange={(e: any) => {
                setProduct({ ...product, productName: e.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="input-imageUrl" style={{ width: "170px" }}>
              Image URL:
            </InputGroup.Text>
            <Form.Control
              type="url"
              defaultValue={product.imageUrl}
              onChange={(e: any) => {
                setProduct({ ...product, imageUrl: e.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="input-salesUrl" style={{ width: "170px" }}>
              Sales URL:
            </InputGroup.Text>
            <Form.Control
              type="url"
              defaultValue={product.salesUrl}
              onChange={(e) => {
                setProduct({ ...product, salesUrl: e.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="input-price" style={{ width: "170px" }}>
              Price:
            </InputGroup.Text>
            <Form.Control
              type="number"
              defaultValue={product.price}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text
              id="input-amountOfSizes"
              style={{ width: "170px" }}
            >
              Amount of Sizes:
            </InputGroup.Text>
            <Form.Control
              type="number"
              placeholder=""
              defaultValue={product.amountOfSizes}
              onChange={(e) => {
                setProduct({ ...product, amountOfSizes: e.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text
              id="input-amountOfColours"
              style={{ width: "170px" }}
            >
              Amount of Colours:
            </InputGroup.Text>
            <Form.Control
              type="number"
              defaultValue={product.amountOfColours}
              onChange={(e) => {
                setProduct({ ...product, amountOfColours: e.target.value });
              }}
            />
          </InputGroup>

          <Button
            onClick={() => {
              updateFirestoreProduct(productId);
            }}
          >
            Update Product
          </Button>
        </Form.Group>
      </Row>
    </Container>
  );
}
