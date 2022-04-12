import DigitalReleaseItem from "./digitalReleaseItem/DigitalReleaseItem";
import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { Container } from "react-bootstrap";
import FeaturedItem from "./FeaturedItem";

export default function FeaturedReleases({ updateReleaseList }: any) {
  const [featuredReleases, setFeaturedReleases] = useState<any[]>([]);

  async function getFeaturedReleases() {
    const featuredRef = await collection(db, "featured");

    let featureArr: any[] = [];
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
