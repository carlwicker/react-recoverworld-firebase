import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

interface IStudio {}

export default function Studio({}: IStudio) {
  return (
    <div
      style={{
        marginTop: "50vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Helmet>
        <title>RecoverWorld Online: Studio</title>
        <link href="http://recoverworld.com/about" />
        <meta
          name="keywords"
          content="RecoverWorld, Dance Music, EDM, Trance, MP3, Wav, Digital, Techno, Chris Hampshire, AmpSuite, Music distribution, Music Publishing, Record Label, Record Label Services"
        ></meta>
        <meta name="author" content="Chris Hampshire"></meta>

        <meta
          property="og:image"
          content={`https://firebasestorage.googleapis.com/v0/b/recoverworld-d5ab4.appspot.com/o/theCube..webp?alt=media&token=${process.env.REACT_APP_IMAGE_TOKEN}`}
        />
      </Helmet>

      <Row>
        <Col md={8}>
          <h2>Studio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            accusamus at numquam doloremque sunt dolorum rerum, sit tempore
            quisquam praesentium sapiente nulla quis iure iste.
          </p>
        </Col>
      </Row>
    </div>
  );
}
