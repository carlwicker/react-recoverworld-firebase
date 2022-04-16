import { Container, Carousel, Button } from "react-bootstrap";
import { FaSoundcloud } from "react-icons/fa";
import css from "./Carousel.module.css";

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
                gap: "30px",
              }}
            >
              <h1 style={{ lineHeight: "0.8em", overflowWrap: "break-word" }}>
                <b>RECOVERWORLD</b> RADIO
              </h1>

              <div style={{ width: "fitContent" }}>
                <Button
                  className={css["btn-soundcloud"]}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <FaSoundcloud style={{ fontSize: "2em" }} />
                  <div style={{ opacity: "1", textAlign: "left" }}>
                    RecoverWorld Soundcloud
                  </div>
                </Button>
              </div>
            </div>
          </Carousel.Caption>
        </Container>
      </Carousel.Item>
    </Carousel>
  );
}
