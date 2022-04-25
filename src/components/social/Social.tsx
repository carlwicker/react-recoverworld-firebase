import css from "./Social.module.css";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";

export default function Social() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <a href="http://www.facebook.com" target="_blank">
        <BsFacebook className={css["social-icon"]} />
      </a>
      <a href="http://www.twitter.com" target="_blank">
        <BsTwitter className={css["social-icon"]} />
      </a>
      <a href="http://www.instagram.com" target="_blank">
        <BsInstagram className={css["social-icon"]} />
      </a>
      <a href="http://www.youtube.com" target="_blank">
        <BsYoutube className={css["social-icon"]} />
      </a>
    </div>
  );
}
