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
          alignItems: "center",
        }}
      >
        <img
          src="../../img/bannerTest1.png"
          style={{ height: "400px", opacity: 0.45 }}
        />
        <Carousel.Caption
          style={{
            textAlign: "left",
            alignItems: "center",
            height: "400px",
            display: "flex",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <h1 style={{ lineHeight: "0.8em" }}>RECOVERWORLD RADIO</h1>
            <h3 style={{ lineHeight: "0.8em" }}>Every Friday @ 22:00GMT</h3>
            <h4 style={{ lineHeight: "0.8em" }}>With Chris Hampshire</h4>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
