import { useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import IRelease from "../../interfaces/IRelease";
import DigitalReleaseItem from "./../digital/digitalReleaseItem/DigitalReleaseItem";

interface ILabel {
  setIsCaraselVisible: any;
}

export default function Label({ setIsCaraselVisible }: ILabel) {
  const { label } = useParams();
  const [releases, setReleases] = useState<IRelease[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<IRelease[] | []>([]);

  useEffect(() => {
    setIsCaraselVisible(false);
  }, []);

  function updateReleaseList() {
    return null;
  }

  async function getReleasesForLabel() {
    const releasesRef = collection(db, "releases");
    const q = query(
      releasesRef,
      where("label", "==", label),
      orderBy("releaseDate", "desc")
    );

    let releaseArr: any = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      releaseArr.push({ id: doc.id, ...doc.data() });
    });
    setReleases(releaseArr);
  }

  useEffect(() => {
    getReleasesForLabel();
  }, []);

  useEffect(() => {
    let filteredArr: any = [];
    function filterReleases() {
      console.log(releases);
      releases?.forEach((release: IRelease) => {
        if (
          release?.artist?.toLowerCase().includes(search) ||
          release?.title?.toLowerCase().includes(search)
        ) {
          filteredArr.push(release);
        }
      });
    }
    setFilteredResults(filteredArr);

    if (search.length >= 2) {
      filterReleases();
    }
  }, [search]);

  useEffect(() => {
    console.log(releases);
  }, [releases]);

  useEffect(() => {
    console.log(filteredResults);
  }, [filteredResults]);

  return (
    <Container style={{ textAlign: "left" }}>
      <h2>{label}</h2>

      <Form>
        <Form.Group className="mb-3" controlId="releaseSearch">
          <Form.Control
            type="text"
            placeholder="Search..."
            onChange={(e: any) => {
              setSearch(e.target.value.toLowerCase());
            }}
          />
          <Form.Text className="text-muted">
            Search Release Artist, Release Name.
          </Form.Text>
        </Form.Group>
      </Form>

      {search.length <= 2 ? (
        <>
          {releases?.map((release: any, index: number) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DigitalReleaseItem
                  release={release}
                  updateReleaseList={updateReleaseList}
                />
              </div>
            );
          })}
        </>
      ) : (
        <>
          {filteredResults?.map((release: any, index: number) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DigitalReleaseItem
                  release={release}
                  updateReleaseList={updateReleaseList}
                />
              </div>
            );
          })}
        </>
      )}
    </Container>
  );
}
