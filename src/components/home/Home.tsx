import { Container } from "react-bootstrap";
import FeaturedReleases from "../digital/FeaturedReleases";
import { useEffect } from "react";

interface IHome {
  setIsCaraselVisible: any;
  isAdmin: boolean;
}

export default function Home({ setIsCaraselVisible, isAdmin }: IHome) {
  useEffect(() => setIsCaraselVisible(true), []);

  return (
    <Container>
      <FeaturedReleases isAdmin={isAdmin} />
    </Container>
  );
}
