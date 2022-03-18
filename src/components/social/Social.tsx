import css from "./Social.module.css";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
import { SiBeatport } from "react-icons/si";

export default function Social() {
  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      <BsFacebook className={css["social-icon"]} />
      <BsTwitter className={css["social-icon"]} />
      <BsInstagram className={css["social-icon"]} />
      <BsYoutube className={css["social-icon"]} />
      <SiBeatport className={css["social-icon"]} />
    </div>
  );
}
