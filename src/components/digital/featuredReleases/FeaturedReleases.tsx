import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import FeaturedItem from "./FeaturedItem";
import IRelease from "../../../interfaces/IRelease";

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
