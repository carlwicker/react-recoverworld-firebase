import { Container } from "react-bootstrap";
import FeaturedReleases from "../digital/FeaturedReleases";
import RadioBanner from "../radioBanner/RadioBanner";

export default function Home() {
  return (
    <Container>
      <RadioBanner />
      <FeaturedReleases />
    </Container>
  );
}
