import { useEffect, useState } from "react";
import { Container, Button, Carousel, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { start } from "repl";

export default function Merchantise() {
  const data = require("../../json/teemill.json");
  const [itemArr, setItemArr] = useState<any[]>([]);

  console.log(data);

  function removeDuplicateData(data: any) {
    data.forEach((item: any) => {
      if (item.size === "M") {
        // setItemArr([...itemArr, item]);
        setItemArr((itemArr) => [...itemArr, item]);
      }
    });

    console.log(itemArr);
    //   itemArr.forEach((item: any) => {});
  }

  useEffect(() => {
    removeDuplicateData(data);
  }, []);

  useEffect(() => {
    console.log(itemArr);
  }, [itemArr]);

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
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
            key={index}
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                //   backgroundColor: "grey",
                justifyContent: "start",
                alignItems: "center",
                gap: "20px",
                marginLeft: "150px",
              }}
            >
              <div>
                <img
                  src={item?.image_link}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "20px",
                    opacity: "0.75",
                    backgroundColor: "red",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: "800" }}>
                  {item?.title}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "100",
                    marginBottom: "20px",
                  }}
                >
                  {item?.price}
                </div>

                <a href={item?.link} target="_blank">
                  <Button>Buy Now</Button>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </Container>
  );
}
