import { useEffect, useState } from "react";
import { Container, Button, Row, Col, Badge } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import css from "./Merchandise.module.css";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Merchandise() {
  const [merchandise, setMerchandise] = useState<any[]>([]);

  async function getMerchandise() {
    const querySnapshot = await getDocs(collection(db, "merchandise"));
    let productArr: any[] = [];
    querySnapshot.forEach((product) => {
      let productObj = {
        id: product.id,
        ...product.data(),
      };
      productArr.push(productObj);
    });
    setMerchandise([...productArr]);
  }

  useEffect(() => {
    getMerchandise();
  }, []);

  async function removeProductFromFirebase(id: string) {
    await deleteDoc(doc(db, "merchandise", id));
    getMerchandise();
  }

  let isAdmin = false;

  useEffect(() => {
    console.log(merchandise);
  }, [merchandise]);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col>
          <h1>Merchandise</h1>
        </Col>

        {/* Admin Add Release Button */}
        {isAdmin ? (
          <Col style={{ display: "flex", justifyContent: "end" }}>
            <Link to="/merchandise/add">
              <Button variant="primary">Add Product</Button>
            </Link>
          </Col>
        ) : (
          ""
        )}
      </Row>

      {merchandise.map((product: any, index: number) => {
        return (
          <Row
            key={index}
            className="mb-2"
            target="_blank"
            style={{
              display: "flex",
              borderRadius: "15px 0px 15px 0px",
              borderBottom: "1px dashed #555",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
              }}
              key={index}
              className={css.item}
            >
              <a href={product.salesUrl} target="_blank">
                <Image src={product?.imageUrl} style={{ height: "250px" }} />
              </a>
              <div style={{ textAlign: "start" }}>
                <a href={product.salesUrl} target="_blank">
                  <h3>{product?.productName}</h3>
                </a>
                <p style={{ textTransform: "capitalize" }}>
                  {product?.amountOfColours} Colours / {product?.amountOfSizes}{" "}
                  sizes
                </p>
                <a href={product.salesUrl} target="_blank">
                  <Badge pill bg="primary">
                    <div style={{ fontSize: "2em" }}>{product?.price} GBP</div>
                  </Badge>
                </a>
                <div className="mt-3">
                  {isAdmin ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Link to={product.id + "/edit"}>
                        <Button variant="outline-warning">Edit</Button>
                      </Link>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          removeProductFromFirebase(product?.id);
                        }}
                      >
                        Remove Product
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Row>
        );
      })}
    </Container>
  );
}
