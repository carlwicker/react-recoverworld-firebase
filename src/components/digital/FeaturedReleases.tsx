import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { Row } from "react-bootstrap";
import FeaturedItem from "./FeaturedItem";
import IRelease from "../../interfaces/IRelease";

export default function FeaturedReleases() {
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

  useEffect(() => {
    console.log(featuredReleases);
  }, [featuredReleases]);

  return (
    <>
      <Row
        style={{
          textAlign: "left",
          // borderBottom: "1px  #555 dashed",
          paddingTop: "20px",
        }}
      >
        <h2>New releases</h2>
      </Row>
      <Row style={{ textAlign: "left" }}>
        {featuredReleases?.map((release: any, index: number) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <FeaturedItem
                release={release}
                getFeaturedReleases={getFeaturedReleases}
              />
            </div>
          );
        })}
      </Row>
    </>
  );
}
