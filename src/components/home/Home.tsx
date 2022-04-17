import { Container } from "react-bootstrap";
import FeaturedReleases from "../digital/FeaturedReleases";
import RadioBanner from "../carousel/Carousel";
import { useEffect } from "react";

interface IHome {
  setIsCaraselVisible: any;
}

export default function Home({ setIsCaraselVisible }: IHome) {
  useEffect(() => setIsCaraselVisible(true));

  return (
    <Container>
      <FeaturedReleases />
    </Container>
  );
}
