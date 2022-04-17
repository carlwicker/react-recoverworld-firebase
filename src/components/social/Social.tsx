import css from "./Social.module.css";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
import { Container } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function Social() {
  return (
    <Container>
      <div style={{ display: "flex", gap: "10px" }} className="py-5">
        <BsFacebook className={css["social-icon"]} />
        <BsTwitter className={css["social-icon"]} />
        <BsInstagram className={css["social-icon"]} />
        <BsYoutube className={css["social-icon"]} />
      </div>
    </Container>
  );
}
