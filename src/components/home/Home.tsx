import FeaturedReleases from "../digital/featuredReleases/FeaturedReleases";
import HomeCarousel from "./homeCarousel/HomeCarousel";

interface IHome {
  isAdmin: boolean;
}

export default function Home({ isAdmin }: IHome) {
  return (
    <>
      <HomeCarousel />
      <FeaturedReleases isAdmin={isAdmin} />
    </>
  );
}
