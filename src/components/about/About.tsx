import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>RecoverWorld Online: About</title>
        <link href="http://recoverworld.com/about" />
        <meta
          name="keywords"
          content="RecoverWorld, Dance Music, EDM, Trance, MP3, Wav, Digital, Techno, Chris Hampshire, AmpSuite, Music distribution, Music Publishing, Record Label, Record Label Services"
        ></meta>
        <meta name="author" content="Chris Hampshire"></meta>

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/recoverworld-d5ab4.appspot.com/o/theCube..webp?alt=media&token=b7f4f864-5e92-4990-b9a5-2f75215852a6"
        />
      </Helmet>

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
