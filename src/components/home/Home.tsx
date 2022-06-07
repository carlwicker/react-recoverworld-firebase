import FeaturedReleases from "../digital/featuredReleases/FeaturedReleases";
import HomeCarousel from "./homeCarousel/HomeCarousel";
import { Helmet } from "react-helmet-async";

interface IHome {
  isAdmin: boolean;
}

export default function Home({ isAdmin }: IHome) {
  return (
    <>
      <Helmet>
        <title>RecoverWorld Online: Home</title>
        <link href="http://recoverworld.com/home" />
        <meta
          name="keywords"
          content="RecoverWorld, Dance Music, EDM, Trance, MP3, Wav, Digital, Techno, Chris Hampshire, AmpSuite, Music distribution, Music Publishing, Record Label, Record Label Services"
        ></meta>
        <meta name="author" content="Chris Hampshire"></meta>

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/recoverworld-d5ab4.appspot.com/o/theCube..webp?alt=media&token=b7f4f864-5e92-4990-b9a5-2f75215852a6"
        />
      </Helmet>

      <HomeCarousel />
      <FeaturedReleases isAdmin={isAdmin} />
    </>
  );
}
