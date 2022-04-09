import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Carousel,
  Row,
  Col,
  Badge,
  Card,
} from "react-bootstrap";
import css from "./Merchandise.module.css";
import { Link } from "react-router-dom";

export default function Merchandise() {
  const [itemArr, setItemArr] = useState<any[]>([]);

  useEffect(() => {
    setItemArr([
      {
        title: "Discover Records T",
        imgUrl: "./img/merchandise/DiscoverT.png",
        salesUrl:
          "https://recoverworld.teemill.com/product/classic-discover-records-t-shirt/",
        price: 19.0,
      },
      {
        title: "Discover Dark T",
        imgUrl: "./img/merchandise/discoverDarkT.png",
        salesUrl:
          "https://recoverworld.teemill.com/product/classic-discover-dark-mens-t-shirt/",
        price: 19.0,
      },
      {
        title: "Discover Hoodie",
        imgUrl: "./img/merchandise/DiscoverHoodie.png",
        salesUrl:
          "https://recoverworld.teemill.com/product/classic-discover-records-mens-hoodie/",
        price: 40.0,
      },
      {
        title: "Discover Dark Hoodie",
        imgUrl: "./img/merchandise/DiscoverDarkHoodie.png",
        salesUrl:
          "https://recoverworld.teemill.com/product/classic-discover-dark-mens-hoodie/",
        price: 40.0,
      },
    ]);
    console.log(itemArr);
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <Row
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>Merchandise</h1>
      </Row>

      {itemArr.map((item: any, index: number) => {
        return (
          <div
            className="mb-2"
            style={{
              display: "flex",
              // gap: "5px",
              // backgroundColor: "#333",
              borderRadius: "15px 0px 15px 0px",
              // boxShadow: "0px 0px 15px -2px rgba(0,0,0,0.57)",
              borderBottom: "1px dashed #555",
            }}
          >
            <Card.Body>
              <a
                key={index}
                className={css.item}
                href={item.salesUrl}
                target="_blank"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textTransform: "uppercase",
                  }}
                >
                  <img src={item.imgUrl} style={{ height: "250px" }} />
                  <div style={{ textAlign: "start", fontSize: "2em" }}>
                    <h3>{item.title}</h3>
                    <Badge>{item.price} GBP</Badge>
                  </div>
                </div>
              </a>
            </Card.Body>
          </div>
        );
      })}
    </Container>
  );
}
