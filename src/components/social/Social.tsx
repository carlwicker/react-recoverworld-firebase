import css from "./Social.module.css";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";

import { Link } from "react-router-dom";

export default function Social() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Link to="http://www.facebook.com" target="_blank">
        <BsFacebook className={css["social-icon"]} />
      </Link>
      <Link to="http://www.twitter.com" target="_blank">
        <BsTwitter className={css["social-icon"]} />
      </Link>
      <Link to="http://www.instagram.com" target="_blank">
        <BsInstagram className={css["social-icon"]} />
      </Link>
      <Link to="http://www.youtube.com" target="_blank">
        <BsYoutube className={css["social-icon"]} />
      </Link>
    </div>
  );
}
