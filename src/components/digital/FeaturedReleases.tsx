import DigitalReleaseItem from "./digitalReleaseItem/DigitalReleaseItem";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Container } from "react-bootstrap";
import FeaturedItem from "./FeaturedItem";

export default function FeaturedReleases({ updateReleaseList }: any) {
  const [featuredReleases, setFeaturedReleases] = useState<any[]>([]);

  async function getFeaturedReleases() {
    const querySnapshot = await getDocs(collection(db, "featured"));

    let featureArr: any[] = [];
    querySnapshot.forEach((doc) => {
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
    <Container style={{ textAlign: "left" }}>
      {featuredReleases?.map((release: any, index: number) => {
        return (
          <div
            key={index}
            style={{
              padding: "5px",
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
    </Container>
  );
}
