import css from "./DigitalTrack.module.css";
import { BsSpotify, BsYoutube } from "react-icons/bs";
import { SiBeatport, SiSoundcloud, SiItunes } from "react-icons/si";
import ITrack from "../../../interfaces/ITrack";

interface IDigitalTrack {
  track: ITrack;
  index: any;
  ampsuiteId: number;
}

export default function DigitalTrack({
  track,
  index,
  ampsuiteId,
}: IDigitalTrack) {
  return (
    <>
      <div className={css["digital-track"]}>
        <div className={css["digital-track-number"]}>
          {index ? ("0" + (index + 1)).slice(-2) : "0" + (index + 1)}
        </div>

        <div className={css["digital-track-icons"]} style={{}}>
          {track.youtube !== "" && (
            <a href={track.youtube} target="blank">
              <BsYoutube style={{ fontSize: "20px" }} className={css.icon} />
            </a>
          )}
          {track.spotify !== "" && (
            <a href={track.spotify} target="blank">
              <BsSpotify style={{ fontSize: "20px" }} className={css.icon} />
            </a>
          )}
          {track.soundcloud !== "" && (
            <a href={track.soundcloud} target="blank">
              <SiSoundcloud style={{ fontSize: "20px" }} className={css.icon} />
            </a>
          )}
          {track.beatport !== "" && (
            <a href={track.beatport} target="blank">
              <SiBeatport style={{ fontSize: "20px" }} className={css.icon} />
            </a>
          )}
          {track.itunes !== "" && (
            <a href={track.itunes} target="blank">
              <SiItunes style={{ fontSize: "20px" }} className={css.icon} />
            </a>
          )}

          <a
            href={`https://store.recoverworld.com/store/view_release?release=${ampsuiteId}`}
            target="blank"
          >
            <div className={css.icon} style={{ fontSize: "12px" }}>
              MP3
            </div>
          </a>
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
