import css from "./Social.module.css";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";

export default function Social() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <a
        href="https://www.facebook.com/Recoverworld"
        target="_blank"
        rel="noreferrer"
      >
        <BsFacebook className={css["social-icon"]} />
      </a>
      <a
        href="https://twitter.com/recoverworld"
        target="_blank"
        rel="noreferrer"
      >
        <BsTwitter className={css["social-icon"]} />
      </a>
      <a
        href="https://www.instagram.com/recoverworld_family/"
        target="_blank"
        rel="noreferrer"
      >
        <BsInstagram className={css["social-icon"]} />
      </a>
      <a
        href="https://www.youtube.com/c/Recoverworld"
        target="_blank"
        rel="noreferrer"
      >
        <BsYoutube className={css["social-icon"]} />
      </a>
    </div>
  );
}
