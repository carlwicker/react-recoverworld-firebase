import { Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <div>
      <Container>
        <Row>
          <Col
            md={6}
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>About</h2>

            <p>
              We are an established and continually expanding collection of
              record labels, a publishing company, online record store,
              consultancy, management and recording / mastering studio.
            </p>

            <p>
              Recoverworld started out as "Eve Records" back in 1994 and as such
              is one of the UK's oldest independent dance music label groups. We
              offer a bespoke management and royalty accounting service for
              record labels and artists. We also have our own labels including
              Discover, Eve and Kill the Lights, releasing independent dance
              music across a variety of genres including trance, techno and
              house. Our past and present group of artists reads like a who's
              who of credible dance music. It includes Pablo Gargano, John
              Askew, Jose Amnesia, Sean Tyas, John O'Callaghan, Chris Hampshire
              and many more. Just check our "Artist" section for a comprehensive
              list.
            </p>

            <p>
              Our artists come from all over the world, including The
              Netherlands, Australia, USA, Ireland and Russia giving
              Recoverworld a truly international flavour.
            </p>

            <p>
              Our music is licensed internationally and includes large scale
              compilations via labels including Armada, Ministry of Sound, Sony,
              Vandit and Warner Music as well as numerous credible underground
              mixes.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
