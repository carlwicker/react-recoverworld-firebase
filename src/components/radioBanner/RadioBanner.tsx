import { Image, Carousel } from "react-bootstrap";

export default function RadioBanner() {
  return (
    <Carousel
      fade={true}
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <Carousel.Item
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <img
          src="../../img/bannerTest1.png"
          style={{ height: "400px", opacity: 0.45 }}
        />
        {/* <Carousel.Caption>
          <h3>RECOVERWORLD RADIO</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}
