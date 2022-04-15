import { Container, Carousel, Button } from "react-bootstrap";

export default function RadioBanner() {
  return (
    <Carousel
      fade={true}
      indicators={false}
      style={{
        height: "70vh",
        width: "100%",
      }}
    >
      <Carousel.Item
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "70vh",
        }}
      >
        {/* <img src="../../img/floatingCube.png" style={{ opacity: 0.95 }} /> */}
        <Carousel.Caption
          style={{
            textAlign: "left",
            alignItems: "center",
            height: "70vh",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              maxWidth: "350px",
              opacity: ".95",
              left: "0",
            }}
          >
            <h1 style={{ lineHeight: "0.8em", overflowWrap: "break-word" }}>
              RECOVERWORLD RADIO
            </h1>
            <p style={{ lineHeight: "0.8em" }}>Live every Friday @ 22:00GMT</p>
            <div style={{ width: "fitContent" }}>
              <Button>Listen Now</Button>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
