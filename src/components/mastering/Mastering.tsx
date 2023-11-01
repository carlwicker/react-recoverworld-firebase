import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FaUserLarge, FaDeezer, FaFileArrowDown } from "react-icons/fa6";

interface IMastering {}

export default function Mastering({}: IMastering) {
  return (
    <div
      style={{
        marginTop: "50vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Helmet>
        <title>RecoverWorld Online: Mastering</title>
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
        <h2>Mastering</h2>
        <p>Get a free preview of your mastered track</p>

        <iframe
          title="mastering"
          style={{
            width: "100%",
            height: "300px",
            border: "none",
          }}
          height="300"
          src="https://partners.masterchannel.ai/partners/recoverworld/embed"
          loading="eager"
        ></iframe>
      </Row>
      <br />
      <br />
      <Row style={{ textAlign: "center" }}>
        <br />
        <br />
        <h4>Why master your music?</h4>
      </Row>
      <br />
      <br />
      <Row style={{ height: "300px" }}>
        <Col md={4} style={{ textAlign: "center" }}>
          <h3>
            <FaUserLarge />
          </h3>
          <p>Sound good on any device: speakers, headphones or radio</p>
        </Col>
        <Col md={4} style={{ textAlign: "center" }}>
          <h3>
            <FaDeezer />
          </h3>
          <p>Optimised for streaming platforms</p>
        </Col>
        <Col md={4} style={{ textAlign: "center" }}>
          <h3>
            <FaFileArrowDown />
          </h3>
          <p>Leave the technical headache to us and focus on creating</p>
        </Col>
      </Row>
      <Row>
        <br />
        <br />
        <h4>Frequently Asked Questions</h4>
        <br />
        <br />
        <b>Who is this for?</b>

        <p>
          This is for artists and producers like you, no matter if you are a
          bedroom producer or a Grammy-winner. This is for anyone who wants
          peace of mind that their tracks sound great everywhere. You can focus
          on producing great music instead of running around testing your tracks
          on different speakers all day.
        </p>
        <br />
        <br />
        <b>Why use AI to master my tracks?</b>
        <p>
          Historically, mastering has been the domain of highly skilled
          engineers, who use their ears and specialized equipment to perfect the
          sound of a recording. However, with advances in artificial
          intelligence and machine learning, Masterchannel is now challenging
          the role of the human mastering engineer.
        </p>
        <p>
          Using sophisticated modelling and optimization, this mastering AI
          learns by itself what makes a good master. Top musicians and producers
          have also been involved in the development of this system to ensure
          that it’s capable of producing results that meet the highest standards
          of quality.
        </p>
        <br />
        <br />
        <b>How should I prepare my tracks before uploading?</b>
        <p>For optimal results, follow these 3 steps:</p>
        <ol>
          <li>Make sure your mix doesn't peak above 0dBFS.</li>
          <li>
            Remove all limiters and other mastering plugins from your master
            bus.
          </li>
          <li>
            If you’re not happy with the mastered version, go back to your DAW
            and tweak your mix and upload again. The AI will pick up on the
            changes you have made for a better outcome.
          </li>
        </ol>
        <br />
        <br />
        <b>Is this free to try?</b>
        <p>
          Yes, you can upload and test the mastering tool with as many tracks as
          you like for free! You will receive a free preview of your mastered
          track. If you like the free preview, you can choose to purchase the
          fully mastered version. You will never be charged automatically.
        </p>
        <br />
        <br />
        <b>How do I pay for it?</b>
        <p>
          You can upload and test the mastering tool with as many tracks as you
          like for free. If you want to purchase the fully mastered version
          after listening to the free preview, you will be redirected to the
          checkout. Please note that payments will be made to our partner,
          Masterchannel, and will appear as such on your bank statement.
        </p>
        <br />
        <br />
        <b>I have a question, who can I contact?</b>
        <p>
          For any questions specific to mastering, please contact
          recoverworld-support@masterchannel.ai
        </p>
      </Row>
    </div>
  );
}
