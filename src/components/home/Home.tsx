import { Container } from "react-bootstrap";
import FeaturedReleases from "../digital/FeaturedReleases";
import RadioBanner from "../carousel/Carousel";

interface IHome {
  setIsCaraselVisible: any;
}

export default function Home({ setIsCaraselVisible }: IHome) {
  setIsCaraselVisible(true);
  return (
    <Container>
      <FeaturedReleases />
    </Container>
  );
}
