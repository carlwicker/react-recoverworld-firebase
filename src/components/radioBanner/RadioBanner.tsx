import { Image, Carousel } from "react-bootstrap";

export default function RadioBanner() {
  return (
    <Carousel
      fade={true}
      style={{
        height: "80vh",
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
          // src="../../img/bannerTest1.png"
          style={{ height: "80vh", opacity: 0.95 }}
        />
        <Carousel.Caption
          style={{
            textAlign: "left",
            alignItems: "center",
            height: "80vh",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              maxWidth: "350px",
            }}
          >
            <h1 style={{ lineHeight: "0.8em", overflowWrap: "break-word" }}>
              RECOVERWORLD RADIO
            </h1>
            <h3 style={{ lineHeight: "0.8em" }}>Every Friday @ 22:00GMT</h3>
            <h4 style={{ lineHeight: "0.8em" }}>With Chris Hampshire</h4>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
