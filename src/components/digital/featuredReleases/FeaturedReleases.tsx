import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import FeaturedItem from "./FeaturedItem";
import IRelease from "../../../interfaces/IRelease";
import { Helmet } from "react-helmet-async";

interface IFeaturedReleases {
  isAdmin: boolean;
}

export default function FeaturedReleases({ isAdmin }: IFeaturedReleases) {
  const [featuredReleases, setFeaturedReleases] = useState<IRelease[]>([]);

  async function getFeaturedReleases() {
    const featuredRef = await collection(db, "featured");

    let featureArr: IRelease[] = [];
    const q: any = query(featuredRef, orderBy("releaseDate", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      featureArr.push({ ...doc.data(), id: doc.id });
    });
    setFeaturedReleases(featureArr);
  }

  useEffect(() => {
    getFeaturedReleases();
  }, []);

  return (
    <>
      <Helmet>
        <title>RecoverWorld Online: Home</title>
        <link href="http://recoverworld.com/digital/new" />
        <meta
          name="keywords"
          content="RecoverWorld, Dance Music, EDM, Trance, MP3, Wav, Digital, Techno, Chris Hampshire, AmpSuite, Music distribution, Music Publishing, Record Label, Record Label Services"
        ></meta>
        <meta name="author" content="Chris Hampshire"></meta>

        <meta
          property="og:image"
          content={`https://firebasestorage.googleapis.com/v0/b/recoverworld-d5ab4.appspot.com/o/theCube..webp?alt=media&token=${process.env.REACT_APP_IMAGE_TOKEN}`}
        />
      </Helmet>

      <h2>New Releases</h2>
      {featuredReleases?.map((release: any, index: number) => {
        return (
          <FeaturedItem
            key={index}
            release={release}
            getFeaturedReleases={getFeaturedReleases}
            isAdmin={isAdmin}
          />
        );
      })}
    </>
  );
}
