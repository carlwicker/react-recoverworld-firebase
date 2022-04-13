import { BsSpotify, BsYoutube } from "react-icons/bs";
import { SiBeatport, SiSoundcloud } from "react-icons/si";
import css from "./social.module.css";
import ITrack from "../../../interfaces/ITrack";

interface IDigitalTrack {
  track: ITrack;
  index: any;
}

export default function DigitalTrack({ track, index }: IDigitalTrack) {
  return (
    <>
      <div
        className="d-flex align-items-center"
        style={{
          width: "100%",
          gap: "10px",
        }}
      >
        <span style={{ color: "#555", fontSize: "20px", fontWeight: "800" }}>
          {index + 1 + "  "}
        </span>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "end",
            alignSelf: "center",
          }}
        >
          {track.youtube !== "" ? (
            <a href={track.youtube} target="blank">
              <BsYoutube style={{ fontSize: "20px" }} className={css.social} />
            </a>
          ) : (
            ""
          )}
          {track.spotify !== "" ? (
            <a href={track.spotify} target="blank">
              <BsSpotify style={{ fontSize: "20px" }} />
            </a>
          ) : (
            ""
          )}
          {track.soundcloud !== "" ? (
            <a href={track.soundcloud} target="blank">
              <SiSoundcloud style={{ fontSize: "20px" }} />
            </a>
          ) : (
            ""
          )}
          {track.beatport !== "" ? (
            <a href={track.beatport} target="blank">
              <SiBeatport style={{ fontSize: "20px" }} />
            </a>
          ) : (
            ""
          )}
        </div>

        <div className="ms-2 me-auto">
          <div style={{ fontSize: "14px" }}>
            {track.title} - {track.artist} - {track.mix}
          </div>
        </div>
      </div>
    </>
  );
}
