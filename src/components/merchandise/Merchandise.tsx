import { useEffect, useState } from "react";
import { Button, Badge, Carousel } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Helmet } from "react-helmet-async";

interface IMerchandise {
  isAdmin: boolean;
}

export default function Merchandise({ isAdmin }: IMerchandise) {
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
    getMerchandise();
  }, []);

  async function removeProductFromFirebase(id: string) {
    await deleteDoc(doc(db, "merchandise", id));
    getMerchandise();
  }

  return (
    <>
      <Helmet>
        <title>RecoverWorld Online: Merchandise</title>
        <link href="http://recoverworld.com/merchandise" />
        <meta
          name="keywords"
          content="RecoverWorld, Dance Music, EDM, Trance, MP3, Wav, Digital, Techno, Chris Hampshire, AmpSuite, Music distribution, Music Publishing, Record Label, Record Label Services"
        ></meta>
        <meta name="author" content="Chris Hampshire"></meta>

        <meta
          property="og:image"
          content={`https://firebasestorage.googleapis.com/v0/b/recoverworld-d5ab4.appspot.com/o/theCube..webp?alt=media&token=${process.env.REACT_APP_IMAGE_TOKEN}`}
        />
      </Helmet>

      <Carousel activeIndex={indexCarousel} onSelect={handleSelect}>
        {merchandise.map((product: any, idx: number) => {
          return (
            <div key={idx}>
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
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                width: "100%",
                                justifyContent: "center",
                              }}
                            >
                              <Link to="/merchandise/add">
                                <Button variant="outline-primary">
                                  Add Product
                                </Button>
                              </Link>
                              <Link to={product.id + "/edit"}>
                                <Button variant="outline-warning">Edit</Button>
                              </Link>
                              <Button
                                variant="outline-danger"
                                onClick={() => {
                                  removeProductFromFirebase(product?.id);
                                }}
                              >
                                Remove This Product
                              </Button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ) : null}
            </div>
          );
        })}
      </Carousel>
    </>
  );
}
