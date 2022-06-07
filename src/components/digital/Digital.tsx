import FeaturedReleases from "./featuredReleases/FeaturedReleases";
import { Helmet } from "react-helmet-async";

interface IDigital {
  isAdmin: boolean;
}

export default function Digital({ isAdmin }: IDigital) {
  return (
    <>
      <Helmet>
        <title>RecoverWorld Online: Digital</title>
        <link href="http://recoverworld.com/digital" />
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

      <FeaturedReleases isAdmin={isAdmin} />
    </>
  );
}
