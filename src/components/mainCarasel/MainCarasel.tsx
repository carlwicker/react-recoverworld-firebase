import { Container, Carousel, Button } from "react-bootstrap";

export default function RadioBanner() {
  return (
    <Carousel
      fade={true}
      indicators={false}
      style={{
        height: "80vh",
        width: "100%",
      }}
    >
      <Carousel.Item
        style={{
          height: "80vh",
        }}
      >
        {/* <img src="../../img/floatingCube.png" style={{ opacity: 0.95 }} /> */}
        <Container>
          <Carousel.Caption>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "80vh",
                alignItems: "flex-start",
                justifyContent: "center",
                opacity: ".95",
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
