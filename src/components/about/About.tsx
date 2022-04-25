import { Container, Row, Col } from "react-bootstrap";

interface IAbout {}

export default function About({}: IAbout) {
  return (
    <div
      style={{
        marginTop: "50vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row>
        <Col md={8}>
          <p>
            We are an established and continually expanding collection of record
            labels, a publishing company, online record store, consultancy,
            management and recording / mastering studio.
          </p>

          <p>
            Our past and present group of artists reads like a who's who of
            credible dance music. It includes Pablo Gargano, John Askew, Jose
            Amnesia, Sean Tyas, John O'Callaghan, Chris Hampshire and many more.
          </p>

          <p>
            Our artists come from all over the world, including The Netherlands,
            Australia, USA, Ireland and Russia giving Recoverworld a truly
            international flavour.
          </p>

          <p>
            Our music is licensed internationally and includes large scale
            compilations via labels including Armada, Ministry of Sound, Sony,
            Vandit and Warner Music as well as numerous credible underground
            mixes.
          </p>
        </Col>
      </Row>
    </div>
  );
}
