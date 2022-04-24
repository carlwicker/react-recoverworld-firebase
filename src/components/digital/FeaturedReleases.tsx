import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { Row } from "react-bootstrap";
import FeaturedItem from "./FeaturedItem";
import IRelease from "../../interfaces/IRelease";
import css from "./FeaturedReleases.module.css";

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
      <Row style={{ textAlign: "left" }} className={css["featured-items-list"]}>
        {featuredReleases?.map((release: any, index: number) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FeaturedItem
                release={release}
                getFeaturedReleases={getFeaturedReleases}
                isAdmin={isAdmin}
              />
            </div>
          );
        })}
      </Row>
    </>
  );
}
