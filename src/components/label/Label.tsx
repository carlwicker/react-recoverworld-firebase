import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
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

    let releaseArr: IRelease[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      releaseArr.push({ id: doc.id, ...doc.data() });
    });
    setReleases(releaseArr);
  }

  useEffect(() => {
    getReleasesForLabel();
  }, [label]);

  useEffect(() => {
    let filteredArr: any = [];
    function filterReleases() {
      releases?.forEach((release: IRelease) => {
        console.log(release);
        if (
          release?.artist?.toLowerCase().includes(search) ||
          release?.title?.toString().toLowerCase().includes(search)
        ) {
          filteredArr.push(release);
        }
      });
    }
    filterReleases();
    setFilteredResults(filteredArr);
  }, [search]);

  return (
    <>
      <h2>{label}</h2>

      <Form
        onSubmit={(e: any) => {
          e.preventDefault();
          setSearch(e.target[0].value.toLowerCase());
        }}
      >
        <Form.Group controlId="releaseSearch">
          <div style={{ display: "flex", gap: "10px" }}>
            <Form.Control
              type="text"
              placeholder="Search..."
              onChange={(e: any) => {
                e.target.value === "" && setSearch("");
              }}
            />
            <Button type="submit">Search</Button>
          </div>
          <Form.Text className="text-muted">
            Search Release Artist, Release Name.
          </Form.Text>
        </Form.Group>
      </Form>

      {search !== "" && (
        <>
          {filteredResults?.map((release: IRelease, index: number) => {
            return (
              <DigitalReleaseItem
                key={index}
                release={release}
                updateReleaseList={updateReleaseList}
                isAdmin={isAdmin}
              />
            );
          })}
        </>
      )}

      {search === "" && (
        <>
          {releases?.map((release: IRelease, index: number) => {
            return (
              <DigitalReleaseItem
                key={index}
                release={release}
                updateReleaseList={updateReleaseList}
                isAdmin={isAdmin}
              />
            );
          })}
        </>
      )}
    </>
  );
}
