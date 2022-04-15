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
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          height: "70vh",
        }}
      >
        {/* <img src="../../img/floatingCube.png" style={{ opacity: 0.95 }} /> */}
        <Container>
          <Carousel.Caption>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
                width: "100%",
                height: "70vh",
                alignItems: "flex-start",
                justifyContent: "center",
                opacity: ".95",
                top: "0",
                left: "0",
                textAlign: "left",
                wordBreak: "break-word",
                paddingTop: "150px",
              }}
            >
              <h1 style={{ lineHeight: "0.8em", overflowWrap: "break-word" }}>
                <b>RECOVERWORLD</b> RADIO
              </h1>
              <p>Live every Friday @ 22:00GMT</p>
              <div style={{ width: "fitContent" }}>
                <Button>Listen Now</Button>
              </div>
            </div>
          </Carousel.Caption>
        </Container>
      </Carousel.Item>
    </Carousel>
  );
}
