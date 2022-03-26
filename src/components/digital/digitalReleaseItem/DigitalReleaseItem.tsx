import { Card, ListGroup } from "react-bootstrap";
import IRelease from "../../../interfaces/IRelease";
import ITrack from "../../../interfaces/ITrack";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import DigitalTrack from "./DigitalTrack";
import DigitalReleaseHeader from "./DigitalReleaseHeader";

interface IDigitalReleaseItem {
  release: IRelease;
  updateReleaseList: Function;
}

export default function DigitalReleaseItem({
  release,
  updateReleaseList,
}: IDigitalReleaseItem) {
  async function deleteRelease(releaseId: string) {
    await deleteDoc(doc(db, "releases", releaseId));
    updateReleaseList();
  }

  return (
    <div
      className="mb-2"
      style={{
        display: "flex",
        gap: "5px",
        backgroundColor: "#111",
        borderRadius: "15px",
      }}
    >
      <Card.Body>
        <DigitalReleaseHeader release={release} deleteRelease={deleteRelease} />

        <div>
          <div style={{ width: "100%", borderTop: "1px solid #222" }}>
            {/* List Tracks */}
            {release.trackListing.map((track: ITrack, index: number) => {
              return <DigitalTrack track={track} key={index} index={index} />;
            })}
          </div>
        </div>
      </Card.Body>
      <hr />
    </div>
  );
}
