import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

interface IDemos {}

export default function Demos({}: IDemos) {
  return (
    <Row style={{ marginTop: "50vh" }}>
      <Helmet>
        <title>RecoverWorld Online: Demos</title>
        <link href="http://recoverworld.com/demos" />
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

      <Col md={8}>
        <p>
          We love new music and are proud to say that a significant number of
          our new releases have come from demo submissions.
        </p>

        <p>
          However, due to the sheer volume that we receive, we do ask that you
          follow a few simple guidelines that will help get your music to us in
          the best shape and the most convenient format.
        </p>

        <ol>
          <li>
            <b>DO NOT</b> send us work in progress. Unfortunately we simply do
            not have the time to coax you through the production process - that
            is what friends are for. When you think you have a great track or
            idea, play it to others and get opinions that you trust as to
            whether your music is of a high enough standard for release. If it
            is, then send it over. If not, then keep working on it until it is.
          </li>
          <li>
            <b>DO NOT</b> send us more than 2 or 3 tracks. If we want more we
            will ask, so send us your best work and if we like it, we will be in
            touch.
          </li>
          <li>
            <b>DO NOT</b> attach files directly to emails. They clog up our
            inbox and are deleted immediately. For submission requirements, see
            below.
          </li>
          <li>
            Include as much information as you can about yourself; previous
            releases, web details, studio details and a phone number. This is
            all useful information but please, no life stories! Be informative
            and succinct!
          </li>
          <li>
            Try to keep your demos as exclusive as possible. If we sign your
            release it will be with a view to selling as many units as possible
            and our job is made much easier if the track isn't already all over
            the Internet.
          </li>
        </ol>

        <p style={{ marginTop: "10vh" }}>
          Initially, we now ask for all tracks to be submitted as SoundCloud,
          YouTube, or any other streaming format. We can then click and listen
          and if we like what we hear we will be in touch for a full length 320
          MP3. Whilst we often give a small amount of feedback on track
          rejections, we regret that we cannot reply to everyone or get involved
          in lengthy dialogue, as we simply do not have the time. Due to the
          large volume of demo submissions, we may not be able to respond or
          listen to your work immediately - please allow at least two weeks
          before 'chasing up' as this will only delay the process.
        </p>
        <p>
          Good luck – we look forward to hearing from you and hopefully working
          with you in the future!
        </p>
        <p>
          <a href="mailto:demos@recoverworld.com">demos@recoverworld.com</a>
        </p>
      </Col>
    </Row>
  );
}
