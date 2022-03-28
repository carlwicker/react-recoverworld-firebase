import { Card } from "react-bootstrap";
import IRelease from "../../../interfaces/IRelease";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
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
        // backgroundColor: "#333",
        borderRadius: "15px 0px 15px 0px",
        // boxShadow: "0px 0px 15px -2px rgba(0,0,0,0.57)",
        borderBottom: "1px dashed #555",
      }}
    >
      <Card.Body>
        <DigitalReleaseHeader release={release} deleteRelease={deleteRelease} />
      </Card.Body>
    </div>
  );
}
