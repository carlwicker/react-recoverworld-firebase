import FeaturedReleases from "./featuredReleases/FeaturedReleases";

interface IDigital {
  isAdmin: boolean;
}

export default function Digital({ isAdmin }: IDigital) {
  return <FeaturedReleases isAdmin={isAdmin} />;
}
