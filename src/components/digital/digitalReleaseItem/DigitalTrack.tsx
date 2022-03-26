import { Card, Col } from "react-bootstrap";
import { BsSpotify, BsYoutube } from "react-icons/bs";
import { SiBeatport, SiSoundcloud } from "react-icons/si";
import ITrack from "../../../interfaces/ITrack";

interface IDigitalTrack {
  track: ITrack;
}

export default function DigitalTrack({ track }: IDigitalTrack) {
  return (
    <>
      <Col style={{ width: "100px" }}></Col>
      <Col>
        <div
          className="d-flex justify-content-between align-items-start"
          style={{
            padding: "10px",
            borderBottom: "1px solid grey",
          }}
        >
          <Col>
            <div className="ms-2 me-auto">
              <div className="bold" style={{ fontSize: "16px" }}>
                {track.title} - {track.artist}
              </div>
              {track.mix}
            </div>
          </Col>

          <Col
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "end",
              alignSelf: "center",
            }}
          >
            {track.youtube !== "" ? (
              <a href={track.youtube} target="blank">
                <BsYoutube style={{ fontSize: "2em", color: "white" }} />
              </a>
            ) : (
              ""
            )}
            {track.spotify !== "" ? (
              <a href={track.spotify} target="blank">
                <BsSpotify style={{ fontSize: "2em", color: "white" }} />
              </a>
            ) : (
              ""
            )}
            {track.soundcloud !== "" ? (
              <a href={track.soundcloud} target="blank">
                <SiSoundcloud style={{ fontSize: "2em", color: "white" }} />
              </a>
            ) : (
              ""
            )}
            {track.beatport !== "" ? (
              <a href={track.beatport} target="blank">
                <SiBeatport style={{ fontSize: "2em", color: "white" }} />
              </a>
            ) : (
              ""
            )}
          </Col>
        </div>
      </Col>
    </>
  );
}
