import { useParams } from "react-router-dom";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import IRelease from "../../interfaces/IRelease";
import DigitalReleaseItem from "./../digital/digitalReleaseItem/DigitalReleaseItem";

interface ILabel {
  isAdmin: boolean;
}

export default function Label({ isAdmin }: ILabel) {
  const { label } = useParams();
  const [releases, setReleases] = useState<IRelease[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<IRelease[] | []>([]);

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
    console.log(filteredResults);
  }, [filteredResults]);

  return (
    <>
      <h2>{label}</h2>

      <Form
        onSubmit={(e: any) => {
          e.preventDefault();
          console.log(e);
          setSearch(e.target[0].value.toLowerCase());
        }}
      >
        <Form.Group controlId="releaseSearch">
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "100%" }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  if (e.target.value === "") {
                    setSearch("");
                  }
                }}
              />
            </div>
            <div>
              <Button type="submit">Search</Button>
            </div>
          </div>
          <Form.Text className="text-muted">
            Search Release Artist, Release Name.
          </Form.Text>
        </Form.Group>
      </Form>

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
                isAdmin={isAdmin}
              />
            </div>
          );
        })}
      </>
    </>
  );
}
