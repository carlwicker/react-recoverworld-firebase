import { useEffect, useState } from "react";
import { Container, Button, Row, Col, Badge, Carousel } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import css from "./Merchandise.module.css";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface IMerchandise {
  setIsCaraselVisible: any;
}

export default function Merchandise({ setIsCaraselVisible }: IMerchandise) {
  const [merchandise, setMerchandise] = useState<any[]>([]);

  const [indexCarousel, setIndexCarosel] = useState(0);

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndexCarosel(selectedIndex);
  };

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
    setIsCaraselVisible(false);
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
      {/* <Row
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col>
          <h2>Merchandise</h2>
        </Col>
        {isAdmin ? (
          <Col style={{ display: "flex", justifyContent: "end" }}>
            <Link to="/merchandise/add">
              <Button variant="primary">Add Product</Button>
            </Link>
          </Col>
        ) : (
          ""
        )}
      </Row> */}

      <Carousel activeIndex={indexCarousel} onSelect={handleSelect}>
        {merchandise.map((product: any, idx: number) => {
          return (
            <div>
              {indexCarousel === idx ? (
                <Carousel.Item
                  key={indexCarousel}
                  className="mb-2"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "400px",
                  }}
                >
                  <Carousel.Caption>
                    <div key={indexCarousel}>
                      <a href={product.salesUrl} target="_blank">
                        <Image
                          src={product?.imageUrl}
                          style={{ height: "250px" }}
                        />
                      </a>
                      <div>
                        <a href={product.salesUrl} target="_blank">
                          <title>{product?.productName}</title>
                        </a>
                        <p
                          style={{
                            textTransform: "capitalize",
                            textAlign: "center",
                          }}
                        >
                          {product?.amountOfColours} Colours /{" "}
                          {product?.amountOfSizes} sizes
                        </p>
                        <a href={product.salesUrl} target="_blank">
                          <Badge
                            pill
                            bg="primary"
                            style={{
                              textTransform: "capitalize",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ fontSize: "2em" }}>
                              {product?.price} GBP
                            </div>
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
                  </Carousel.Caption>
                </Carousel.Item>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </Carousel>
    </Container>
  );
}
